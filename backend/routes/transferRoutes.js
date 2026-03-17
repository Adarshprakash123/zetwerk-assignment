const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const transferController = require('../controllers/transferController');

const router = express.Router();

router.post('/', asyncHandler(transferController.transfer));

module.exports = router;

