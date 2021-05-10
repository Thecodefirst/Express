var logger = require('log4js').getLogger();
var msg = require('../../utils/msg');
var moment = require('moment');
var querySystem = require('../../utils/querySystem');
var pm = require('../../utils/personal_management');
var commonJS = require('../../utils/common');

/**
 * 获取人员列表
 */
module.exports.getAttendanceList = async function(req,res) {
    try{
        let reqBody = req.body,
            //分页
            page = (Number(reqBody.page) - 1) * reqBody.limit,
            limit = Number(reqBody.limit),
            //查询时间间隔
            start_date = JSON.stringify(reqBody.startTime + ' 00:00:00'), 
            end_date = JSON.stringify(reqBody.endTime + ' 23:59:59'),
            baseStr = `${reqBody.start_date !== '' ? ' AND ai.create_time BETWEEN '+ start_date +' AND '+ end_date : ''}`,
            //正序、倒叙
            sortSQL = reqBody.sort == '-' ? ' ORDER BY ai_f.' + reqBody.sortName + ' desc' : '',
            //分页
            sqlLIMIT = `LIMIT ${page},${limit}`,
            //返回数据
            data = {
                attendanceList: [],
                page: Number(reqBody.page),
                limit: limit,
                total: ''
            },
            //（条件下 全职）查询总条数
            attendanceListSQL = `SELECT `
                            + `ai.id,`
                            + `ai.dd_userid,`
                            + `ai.dd_username,`
                            + `ai.dept_id,`
                            + `ai.dept_name,`
                            + `SUM(ai.should_attendance_days) AS should_attendance_days,`
                            + `SUM(ai.attendance_days) AS attendance_days,`
                            + `SUM(ai.leave_sick) AS leave_sick,`
                            + `SUM(ai.leave_personal) AS leave_personal,`
                            + `SUM(ai.late_times) AS late_times,`
                            + `SUM(ai.leave_early_times) AS leave_early_times,`
                            + `SUM(ai.leave_in_lieu) AS leave_in_lieu,`
                            + `SUM(ai.leave_funeral) AS leave_funeral,`
                            + `SUM(ai.leave_annual) AS leave_annual,`
                            + `SUM(ai.leave_maternity) AS leave_maternity,`
                            + `SUM(ai.leave_paternity) AS leave_paternity,`
                            + `SUM(ai.leave_breastfeeding) AS leave_breastfeeding,`
                            + `SUM(ai.leave_marriage) AS leave_marriage,`
                            + `SUM(ai.attendance_work_time) AS attendance_work_time,`
                            + `SUM(ai.business_trip_time) AS business_trip_time`
                            + ` FROM attendance_info ai`
                            + ` WHERE id${baseStr}`
                            + ` GROUP BY ai.dd_userid`
                            + ` ${sortSQL}${sqlLIMIT}`
        //（条件下）查询总条数
        let totalSQL =  `SELECT COUNT(*) FROM (SELECT * FROM attendance_info ai WHERE id${baseStr} GROUP BY ai.dd_userid) ai_f`
        data.total = await querySystem('',totalSQL)
        if(data.total.success){data.total=data.total.data.result[0]['COUNT(*)']}else{throw data.total.msg}
        data.attendanceList = await querySystem('',attendanceListSQL)
        if(data.attendanceList.success){data.attendanceList=data.attendanceList.data.result}else{throw data.attendanceList.msg}
        //response
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }
}