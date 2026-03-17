const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.post('/', asyncHandler(accountController.createAccount));
router.get('/', asyncHandler(accountController.listAccounts));
router.get('/:id', asyncHandler(accountController.getAccount));
router.get('/:id/transactions', asyncHandler(accountController.getAccountTransactions));

module.exports = router;

