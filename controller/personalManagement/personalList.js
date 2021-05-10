var logger = require('log4js').getLogger();
var msg = require('../../utils/msg');
var moment = require('moment');
var querySystem = require('../../utils/querySystem');
var pm = require('../../utils/personal_management');
var commonJS = require('../../utils/common');

var date = new Date;
var nowYear = date.getFullYear()
let starY = nowYear+'-01-01 00:00:00',
    stopY = nowYear+'-12-31 00:00:00'
    nowTimer = date.getTime()
let yearTimestamp = 31104000000
let monthTimestamp = 2592000000
let leftJoin = `(SELECT cd.config_name FROM config_date cd WHERE cd.id=pm.gender ) gender_name,`
             + `(SELECT cd.config_name FROM config_date cd WHERE cd.id=pm.marital ) marital_name,`
             + `(SELECT cd.config_name FROM config_date cd WHERE cd.id=pm.education ) education_name,`
             + `(SELECT cd.config_name FROM config_date cd WHERE cd.id=pm.working_state ) working_state_name,`
             + `(SELECT cd.config_name FROM config_date cd WHERE cd.id=pm.account_type ) account_type_name,`
             + `(SELECT cm.name FROM company_management cm WHERE cm.id=pm.company_id ) company_name,`
             + `(SELECT dm.name FROM department_management dm WHERE dm.id=pm.department ) department_name,`
             + `(SELECT jm.name FROM jobs_management jm WHERE jm.id=pm.jobs ) jobs_name,`
             + `(SELECT SUM(ai.leave_annual) AS leave_annual FROM attendance_info ai WHERE ai.dd_userid=pm.dd_userid AND ai.create_time BETWEEN '${starY}' AND '${stopY}' GROUP BY ai.dd_userid) leave_annual`
        //格式化时间
let keyList = ['date_birth','hiredate','positive','departure_date','take_job_date','contract_over_date','create_date','update_date']
let timeStr = commonJS.timeStr('pm',keyList,'%Y-%m-%d %T',keyList)

//年假规则
function filterDB(list) {
    // console.log(list)
    for(let i=0;i<list.length;i++) {
        let usableDay = 0
        if(list[i].working_state == '9') {
            let jobTimestamp = new Date(list[i].take_job_date).getTime()//参加工作时间戳
            let hiredateTimestamp = new Date(list[i].hiredate).getTime()//入职时间戳
            if(nowTimer - hiredateTimestamp < 1*yearTimestamp) {
                usableDay = parseInt((nowTimer - hiredateTimestamp)/(2*monthTimestamp))
            }else{
                if(nowTimer - jobTimestamp > 1*yearTimestamp && nowTimer - jobTimestamp < 10*yearTimestamp) {
                    usableDay = 5
                }else if(nowTimer - jobTimestamp > 10*yearTimestamp && nowTimer - jobTimestamp < 20*yearTimestamp) {
                    usableDay = 10
                }else if(nowTimer - jobTimestamp > 20*yearTimestamp) {
                    usableDay = 15
                }
            }
        }
        list[i].usableDay = usableDay
    }
    return list
}

/**
 * 获取人员列表
 */
module.exports.getPersonalList = async function(req,res) {
    // console.log(nowTimer)
    try{
        let reqBody = req.body,
            //分页
            page = (Number(reqBody.page) - 1) * 10,
            limit = Number(reqBody.limit),
            sort = reqBody.sort,
            //查询时间间隔
            start_date = JSON.stringify(reqBody.start_date + ' 00:00:00'), 
            end_date = JSON.stringify(reqBody.end_date + ' 23:59:59'),
            //正序、倒叙
            sortSQL = reqBody.sort == '-' ? ' order by pm.' + reqBody.sortName + ' desc' : '',
            //分页
            sqlLIMIT = ` LIMIT ${page},${limit}`,
            //返回数据结构
            data = {
                personalList: [],
                page: Number(reqBody.total),
                limit: limit,
                total: '',
                thresholdNum: 1
            },
            //SQL语句
            baseStr = `${reqBody.searchUserName !== '' ? ' AND FIND_IN_SET(pm.name,'+JSON.stringify(reqBody.searchUserName)+')' : ''}`
                    +  `${reqBody.companyId !== '' ? ' AND company_id='+reqBody.companyId : ''}`
                    +  `${reqBody.departmentId !== '' ? ' AND department='+reqBody.departmentId : ''}`
                    +  `${reqBody.jobsId !== '' ? ' AND jobs='+reqBody.jobsId : ''}`
                    +  `${reqBody.educationId !== '' ? ' AND education='+reqBody.educationId : ''}`
                    +  `${reqBody.workingStateId !== '' ? ' AND working_state='+reqBody.workingStateId : ''}`
                    +  ` AND del=1`
        //（条件下）查询总条数
        let totalSQL =  `SELECT COUNT(*) FROM personal_management pm WHERE id${baseStr}`
        data.total = await querySystem('',totalSQL)
        if(data.total.success){data.total=data.total.data.result[0]['COUNT(*)']}else{throw data.total.msg}
        //（条件下）查询数据
        let personalListSQL = `SELECT *,${timeStr},${leftJoin} FROM personal_management pm WHERE id${baseStr}${sortSQL}${sqlLIMIT}`
        data.personalList = await querySystem('', personalListSQL)
        if(data.personalList.success){
            data.personalList=filterDB(data.personalList.data.result)
        }else{throw data.personalList.msg}
        //response
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }

}

let selectKeyName = async function(id) {
    try{
        let data = {}
        //（条件下）查询数据
        let personalListSQL = `SELECT *,${timeStr},${leftJoin} FROM personal_management pm WHERE id=${id}`
        data = await querySystem('', personalListSQL)
        if(data.success){            
            return data.data.result[0]
        }else{
            throw data.result.msg
        }
    }catch(err){
        
    }
}

/**
 * 获取枚举表数据
 */
module.exports.getPersonalSelectArr = async function(req,res) {
    try{
        let data = {
            companyList: [],
            departmentList: [],
            jobsList: [],
            gender: [],
            marital: [],
            education: [],
            working_state: [],
            account_type: [],
            userList_typeList: []
        }
        //公司列表
        const companyListSQL = `SELECT * FROM company_management`
        data.companyList = await querySystem('', companyListSQL)
        if(data.companyList.success){data.companyList=data.companyList.data.result}else{throw data.companyList.msg}
        //部门列表
        const departmentListSQL = `SELECT * FROM department_management`
        data.departmentList = await querySystem('', departmentListSQL)
        if(data.departmentList.success){data.departmentList=data.departmentList.data.result}else{throw data.departmentList.msg}
        //职位列表
        const jobsListSQL = `SELECT * FROM jobs_management`
        data.jobsList = await querySystem('', jobsListSQL)
        if(data.jobsList.success){data.jobsList=data.jobsList.data.result}else{throw data.jobsList.msg}
        //性别
        const genderList = `SELECT * FROM config_date cd WHERE cd.config_setting_id=1`
        data.gender = await querySystem('', genderList)
        if(data.gender.success){data.gender=data.gender.data.result}else{throw data.gender.msg}
        //婚姻状况
        const maritalList = `SELECT * FROM config_date cd WHERE cd.config_setting_id=2`
        data.marital = await querySystem('', maritalList)
        if(data.marital.success){data.marital=data.marital.data.result}else{throw data.marital.msg}
        //性别
        const educationList = `SELECT * FROM config_date cd WHERE cd.config_setting_id=3`
        data.education = await querySystem('', educationList)
        if(data.education.success){data.education=data.education.data.result}else{throw data.education.msg}
        //性别
        const working_stateList = `SELECT * FROM config_date cd WHERE cd.config_setting_id=4`
        data.working_state = await querySystem('', working_stateList)
        if(data.working_state.success){data.working_state=data.working_state.data.result}else{throw data.working_state.msg}
        //性别
        const account_typeList = `SELECT * FROM config_date cd WHERE cd.config_setting_id=5`
        data.account_type = await querySystem('', account_typeList)
        if(data.account_type.success){data.account_type=data.account_type.data.result}else{throw data.account_type.msg}
        //钉钉用户
        const userList_typeList = `SELECT ai.dd_username,ai.dept_name,ai.dd_userid FROM attendance_info ai WHERE ai.dd_userid GROUP BY ai.dd_userid`
        data.userList_typeList = await querySystem('', userList_typeList)
        if(data.userList_typeList.success){data.userList_typeList=data.userList_typeList.data.result}else{throw data.userList_typeList.msg}
        //response 合并对象
        // Object.assign(data, pm.personalManagementObject)
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }

}
/**
 * 新增人员addPersonal
 */
module.exports.addPersonal = async function(req,res) {
    try{
        let obj = req.body,
            data = {}
        obj.create_date = moment().format('YYYY-MM-DD HH:mm:ss')
        obj.update_date = moment().format('YYYY-MM-DD HH:mm:ss')
        obj.create_userid = req.session.userInfo.id
        obj.del = 1
        console.log(obj)
        for ( let [key,val] of Object.entries(obj)){
            if(obj[key] == '') {
                obj[key] = null
            }
        }
        data.result = await querySystem('personal_management','insert_personal',[Object.values(obj)])
        if(data.result.success){
            data.result = await selectKeyName(data.result.data.result.insertId)
        }else{
            throw data.result.msg
        }
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }

}
/**
 * 更新人员updatePersonal
 */
module.exports.updatePersonal = async function(req,res) {
    try{
        let obj = req.body,
            data = {}
        obj.update_date = moment().format('YYYY-MM-DD HH:mm:ss')
        obj.create_userid = req.session.userInfo.id
        for ( let [key,val] of Object.entries(obj)){
            if(obj[key] == '') {
                obj[key] = null
            }
        }
        data.result = await querySystem('personal_management','update_personal',Object.values(obj))
        if(data.result.success){
            data.result = await selectKeyName(obj.id)
        }else{
            throw data.result.msg
        }
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }

}
/**
 * 删除人员deletePersonal
 */
 module.exports.deletePersonal = async function(req,res) {
    try{
        let obj = req.body,
            data = {},
            update_date = moment().format('YYYY-MM-DD HH:mm:ss'),
            create_userid = req.session.userInfo.id,
            del = 0
        data.result = await querySystem('personal_management','delete_personal',[update_date,create_userid,del,obj.id])
        if(data.result.success){
            data.result = obj
        }else{
            throw data.result.msg
        }
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }

}