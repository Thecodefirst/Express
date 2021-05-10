var express = require('express');
var router = express.Router();
var userFilter = require('../utils/userFilter');
var authController = require('../controller/authController');

var inLog = userFilter.inLog;

router.post('/systemLogin', inLog, authController.systemLogin);
router.post('/systemLogout', inLog, authController.systemLogout);

router.post('/getUserInfo', inLog, authController.getUserInfo);

module.exports = router;