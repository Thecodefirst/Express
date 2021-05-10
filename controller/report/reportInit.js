var moment = require('moment');
var logger = require('log4js').getLogger();
var msg = require('../../utils/message');

var ding = require('../../utils/dd_sdk')

/**
 * 是否开启智能报表状态查询
 * @param  {string}
 */
module.exports.whetherAiReport = async function (req,res){
    try{
        let dingResult = await ding.aiReport(req.session.userInfo.access_token)
        if(dingResult.errcode == 0) {
            dingResult.code = 20000
            res.send(dingResult)
        }else{
            dingResult.message = dingResult.sub_msg
            res.send(dingResult)
        }
    }catch(err){
        logger.error(req.url,err);
        res.send(msg.failedMsg(err));
    }
}

/**
 * 获取报表列定义
 * @param  {string}
 */
module.exports.getAttcolumns = async function (req,res){
    try{
        let dingResult = await ding.getAttcolumns(req.session.userInfo.access_token)
        if(dingResult.errcode == 0) {
            dingResult.code = 20000
            res.send(dingResult)
        }else{
            dingResult.message = dingResult.sub_msg
            res.send(dingResult)
        }
    }catch(err){
        logger.error(req.url,err);
        res.send(msg.failedMsg(err));
    }
}

/**
 * 获取报表列值
 * @param  {string}
 */
module.exports.getcolumnval = async function (req,res){
    try{
        let dingResult = await ding.getcolumnval(req.session.userInfo.access_token)
        if(dingResult.errcode == 0) {
            dingResult.code = 20000
            res.send(dingResult)
        }else{
            dingResult.message = dingResult.sub_msg
            res.send(dingResult)
        }
    }catch(err){
        logger.error(req.url,err);
        res.send(msg.failedMsg(err));
    }
}