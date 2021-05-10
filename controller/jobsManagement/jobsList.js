var logger = require('log4js').getLogger();
var msg = require('../../utils/msg');
var moment = require('moment');
var querySystem = require('../../utils/querySystem');
var pm = require('../../utils/personal_management');
var commonJS = require('../../utils/common');
/**
 * 获取部门列表
 */
module.exports.getJobsList = async function(req,res) {
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
            sortSQL = `${sort == '-id' ? ' order by jm.id desc' : ''}`,
            //分页
            sqlLIMIT = ` LIMIT ${page},${limit}`,
            //返回数据结构
            data = {
                jobsList: [],
                page: Number(reqBody.total),
                limit: limit,
                total: '',
            },
            timeStr = '',
            //SQL语句
            baseStr = `${reqBody.searchUserName !== '' ? ' AND FIND_IN_SET(jm.name,'+JSON.stringify(reqBody.searchUserName)+')' : ''}`
        //（条件下）查询总条数
        let totalSQL =  `SELECT COUNT(*) FROM jobs_management jm WHERE id${baseStr}`
        data.total = await querySystem('',totalSQL)
        if(data.total.success){data.total=data.total.data.result[0]['COUNT(*)']}else{throw data.total.msg}
        //格式化时间
        let keyList = ['create_date']
        timeStr = commonJS.timeStr('jm',keyList,'%Y-%m-%d %T',keyList)
        //（条件下）查询数据
        let jobsListSQL = `SELECT *,${timeStr} FROM jobs_management jm WHERE id${baseStr}${sortSQL}${sqlLIMIT}`
        data.jobsList = await querySystem('', jobsListSQL)
        if(data.jobsList.success){data.jobsList=data.jobsList.data.result}else{throw data.jobsList.msg}
        //response
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }

}

/**
 * 新增部门
 */
module.exports.addJobs = async function(req,res) {
    try{
        let obj = req.body,
            data = {}
        obj.create_date = moment().format('YYYY-MM-DD HH:mm:ss')
        obj.create_userid = req.session.userInfo.id
        data.result = await querySystem('jobs_management','insert_jobs',[Object.values(obj)])
        if(data.result.success){
            obj.id = data.result.data.result.insertId
            data.result=obj
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
 * 更新部门
 */
module.exports.updateJobs = async function(req,res) {
    try{
        let obj = req.body,
            data = {}
        data.result = await querySystem('jobs_management','update_jobs',[obj.name, obj.create_date, req.session.userInfo.id, obj.id])
        if(data.result.success){
            data.result=obj
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
 * 删除deleteJobs
 */
 module.exports.deleteJobs = async function(req,res) {
    try{
        let obj = req.body,
            data = {}
        data.result = await querySystem('jobs_management','delete_jobs',[obj.id])
        if(data.result.success){
            data.result=obj
        }else{
            throw data.result.msg
        }
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    } 
}