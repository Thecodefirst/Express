var express = require('express');
var router = express.Router();
var userFilter = require('../utils/userFilter');
var index = require('../controller/index/index');

var inLog = userFilter.inLog;

router.post('/info', inLog, index.getInfo);

module.exports = router;