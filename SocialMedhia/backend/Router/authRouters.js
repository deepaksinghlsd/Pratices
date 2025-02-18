const express = require('express');
const router = express.Router();
const authController = require('../Controler/AuthControler');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;