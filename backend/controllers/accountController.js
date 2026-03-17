const accountService = require('../services/accountService');

async function createAccount(req, res) {
  const account = await accountService.createAccount(req.body || {});
  res.status(200).json(account);
}

async function getAccount(req, res) {
  const account = await accountService.getAccountById(req.params.id);
  res.status(200).json(account);
}

async function listAccounts(req, res) {
  const accounts = await accountService.listAccounts();
  res.status(200).json(accounts);
}

async function getAccountTransactions(req, res) {
  const txs = await accountService.getTransactionsForAccount(req.params.id);
  res.status(200).json(txs);
}

module.exports = {
  createAccount,
  getAccount,
  listAccounts,
  getAccountTransactions,
};

