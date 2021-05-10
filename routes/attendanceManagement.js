var express = require('express');
var router = express.Router();
var userFilter = require('../utils/userFilter');
var attendanceList = require('../controller/attendanceManagement/attendanceList');

var inLog = userFilter.inLog;

router.post('/attendanceList', inLog, attendanceList.getAttendanceList);

module.exports = router;