const mongoose = require('mongoose');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

function assertObjectId(id, label) {
  if (!mongoose.isValidObjectId(id)) {
    const err = new Error(`${label} is invalid`);
    err.statusCode = 400;
    throw err;
  }
}

async function createAccount({ name, balance }) {
  if (!name || typeof name !== 'string' || !name.trim()) {
    const err = new Error('name is required');
    err.statusCode = 400;
    throw err;
  }

  const numericBalance = Number(balance);
  if (!Number.isFinite(numericBalance) || numericBalance < 0) {
    const err = new Error('balance must be a number >= 0');
    err.statusCode = 400;
    throw err;
  }

  const account = await Account.create({ name: name.trim(), balance: numericBalance });
  return account.toJSON();
}

async function getAccountById(id) {
  assertObjectId(id, 'Account id');

  const account = await Account.findById(id);
  if (!account) {
    const err = new Error('Account not found');
    err.statusCode = 404;
    throw err;
  }
  return account.toJSON();
}

async function listAccounts() {
  const accounts = await Account.find({}).sort({ createdAt: -1 });
  return accounts.map((a) => a.toJSON());
}

async function getTransactionsForAccount(accountId) {
  assertObjectId(accountId, 'Account id');

  const accountExists = await Account.exists({ _id: accountId });
  if (!accountExists) {
    const err = new Error('Account not found');
    err.statusCode = 404;
    throw err;
  }

  const transactions = await Transaction.find({
    $or: [{ fromAccount: accountId }, { toAccount: accountId }],
  })
    .sort({ createdAt: -1 })
    .lean();

  return transactions.map((t) => ({
    id: t._id.toString(),
    fromAccount: t.fromAccount.toString(),
    toAccount: t.toAccount.toString(),
    amount: t.amount,
    createdAt: t.createdAt,
  }));
}

module.exports = {
  createAccount,
  getAccountById,
  listAccounts,
  getTransactionsForAccount,
};

