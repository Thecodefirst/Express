var express = require('express');
var router = express.Router();
var userFilter = require('../utils/userFilter');
var department = require('../controller/departmentManagement/departmentList');

var inLog = userFilter.inLog;

router.post('/departmentList', inLog, department.getDepartmentList);
router.post('/addDepartment', inLog, department.addDepartment);
router.post('/updateDepartment', inLog, department.updateDepartment);
router.post('/deleteDepartment', inLog, department.deleteDepartment);

module.exports = router;