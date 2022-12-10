const express = require('express');
const router = express.Router();
const loginController  = require('../controller/loginController');

// Submit Login
router.post('/login-submit', loginController.submit);

module.exports = router;