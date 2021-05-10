var logger = require('log4js').getLogger();
var msg = require('../../utils/msg');
var moment = require('moment');
var querySystem = require('../../utils/querySystem');
var pm = require('../../utils/personal_management');
var commonJS = require('../../utils/common');

/**
 * 获取人员列表
 */
module.exports.getCompanyList = async function(req,res) {
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
            sortSQL = `${sort == '-id' ? ' order by cm.id desc' : ''}`,
            //分页
            sqlLIMIT = ` LIMIT ${page},${limit}`,
            //返回数据结构
            data = {
                companyList: [],
                page: Number(reqBody.total),
                limit: limit,
                total: '',
            },
            timeStr = '',
            //SQL语句
            baseStr = `${reqBody.searchUserName !== '' ? ' AND FIND_IN_SET(cm.name,'+JSON.stringify(reqBody.searchUserName)+')' : ''}`
        //（条件下）查询总条数
        let totalSQL =  `SELECT COUNT(*) FROM company_management cm WHERE id${baseStr}`
        data.total = await querySystem('',totalSQL)
        if(data.total.success){data.total=data.total.data.result[0]['COUNT(*)']}else{throw data.total.msg}
        //格式化时间
        let keyList = ['create_date']
        timeStr = commonJS.timeStr('cm',keyList,'%Y-%m-%d %T',keyList)
        //（条件下）查询数据
        let companyListSQL = `SELECT *,${timeStr} FROM company_management cm WHERE id${baseStr}${sortSQL}${sqlLIMIT}`
        data.companyList = await querySystem('', companyListSQL)
        if(data.companyList.success){data.companyList=data.companyList.data.result}else{throw data.companyList.msg}
        //response
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }

}

/**
 * 新增公司addPersonal
 */
module.exports.addCompany = async function(req,res) {
    try{
        let obj = req.body,
            data = {}
        obj.create_date = moment().format('YYYY-MM-DD HH:mm:ss')
        obj.create_userid = req.session.userInfo.id
        data.result = await querySystem('company_management','insert_company',[Object.values(obj)])
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
 * 更新公司updateCompany
 */
module.exports.updateCompany = async function(req,res) {
    try{
        let obj = req.body,
            data = {}
        data.result = await querySystem('company_management','update_company',[obj.name, obj.create_date, req.session.userInfo.id, obj.id])
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
 * 删除deleteCompany
 */
module.exports.deleteCompany = async function(req,res) {
    try{
        let obj = req.body,
            data = {}
        data.result = await querySystem('company_management','delete_company',[obj.id])
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