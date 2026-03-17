const mongoose = require('mongoose');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

function badRequest(message) {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
}

function notFound(message) {
  const err = new Error(message);
  err.statusCode = 404;
  return err;
}

async function transferMoney({ fromAccountId, toAccountId, amount }) {
  if (!mongoose.isValidObjectId(fromAccountId)) throw badRequest('fromAccountId is invalid');
  if (!mongoose.isValidObjectId(toAccountId)) throw badRequest('toAccountId is invalid');

  if (fromAccountId === toAccountId) throw badRequest('cannot transfer to same account');

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) throw badRequest('amount must be greater than 0');

  const [from, to] = await Promise.all([
    Account.findById(fromAccountId),
    Account.findById(toAccountId),
  ]);

  if (!from) throw notFound('fromAccount not found');
  if (!to) throw notFound('toAccount not found');

  if (from.balance < numericAmount) throw badRequest('insufficient balance');

  from.balance -= numericAmount;
  to.balance += numericAmount;

  await Promise.all([from.save(), to.save()]);

  const tx = await Transaction.create({
    fromAccount: from._id,
    toAccount: to._id,
    amount: numericAmount,
  });

  return {
    transaction: tx.toJSON(),
    fromAccount: from.toJSON(),
    toAccount: to.toJSON(),
  };
}

module.exports = { transferMoney };
