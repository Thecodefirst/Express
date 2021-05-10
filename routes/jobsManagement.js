var express = require('express');
var router = express.Router();
var userFilter = require('../utils/userFilter');
var jobs = require('../controller/jobsManagement/jobsList');

var inLog = userFilter.inLog;

router.post('/jobsList', inLog, jobs.getJobsList);
router.post('/addJobs', inLog, jobs.addJobs);
router.post('/updateJobs', inLog, jobs.updateJobs);
router.post('/deleteJobs', inLog, jobs.deleteJobs);

module.exports = router;