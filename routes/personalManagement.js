var express = require('express');
var router = express.Router();
var userFilter = require('../utils/userFilter');
var personalList = require('../controller/personalManagement/personalList');

var inLog = userFilter.inLog;

router.post('/personalList', inLog, personalList.getPersonalList);
router.post('/getPersonalSelectArr', inLog, personalList.getPersonalSelectArr);
router.post('/addPersonal', inLog, personalList.addPersonal);
router.post('/updatePersonal', inLog, personalList.updatePersonal);
router.post('/deletePersonal', inLog, personalList.deletePersonal);

module.exports = router;