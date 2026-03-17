const { transferMoney } = require('../services/transferService');

async function transfer(req, res) {
  const result = await transferMoney(req.body || {});
  res.status(200).json(result);
}

module.exports = { transfer };

