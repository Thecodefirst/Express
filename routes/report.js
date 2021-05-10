var express = require('express');
var router = express.Router();
var userFilter = require('../utils/userFilter');
var reportInit = require('../controller/report/reportInit');

var inLog = userFilter.inLog;

router.post('/whetherAiReport', inLog, reportInit.whetherAiReport);
router.post('/getAttcolumns', inLog, reportInit.getAttcolumns);
router.post('/getcolumnval', inLog, reportInit.getcolumnval);

module.exports = router;