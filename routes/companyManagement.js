var express = require('express');
var router = express.Router();
var userFilter = require('../utils/userFilter');
var companyList = require('../controller/companyManagement/companyList');

var inLog = userFilter.inLog;

router.post('/companyList', inLog, companyList.getCompanyList);
router.post('/addCompany', inLog, companyList.addCompany);
router.post('/updateCompany', inLog, companyList.updateCompany);
router.post('/deleteCompany', inLog, companyList.deleteCompany);

module.exports = router;