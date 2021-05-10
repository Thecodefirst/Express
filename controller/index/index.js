var logger = require('log4js').getLogger();
var msg = require('../../utils/msg');
var moment = require('moment');
var querySystem = require('../../utils/querySystem');
var pm = require('../../utils/personal_management');
var commonJS = require('../../utils/common');

/**
 * 获取人员列表
 */
module.exports.getInfo = async function(req,res) {
    try{
        let data = {
                allEmployees: [],
            }
        //（条件下 全职）查询总条数
        let allEmployeesSQL =  `SELECT cd.config_name as working_state_name,pm.working_state,COUNT(pm.working_state) AS num FROM personal_management pm WHERE pm.del=1 LEFT JOIN config_date cd ON pm.working_state=cd.id GROUP BY working_state`
        data.allEmployees = await querySystem('',allEmployeesSQL)
        if(data.allEmployees.success){data.allEmployees=data.allEmployees.data.result}else{throw data.allEmployees.msg}
        //response
        res.send(msg.successMsg(20000, data, ''))
    }catch(err){
        logger.error(req.url,err)
        res.send(msg.failedMsg(50000, err, ''))
    }

}