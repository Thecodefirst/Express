var mysql = require('mysql');
var moment = require('moment');
var logger = require('log4js').getLogger();
var msg = require('./message');
let querySystem = require('./querySystem');

// 判断是否登录
module.exports.isLogin = function(req,res,next){
    if(['dspzlongren','zlongDspWebApi','marketDspWebApi'].includes(req.headers.token) || req.session.userInfo){
        next();
    }else if(req.url.indexOf('/api') != -1){
        res.status(401).send(msg.failedMsg('用户未登录！'));
    }else{
        res.redirect('/login?redirectUrl='+req.originalUrl);
    }
}

// 判断就否有权限
module.exports.isPower = async function (req,res,next){
    try{
        next();
    }catch(err){
        logger.error(req.url,err);
        res.status(401).send(msg.failedMsg(err));
    }
}

// 记录Log
module.exports.inLog = async function (req,res,next) {
    try{
        var data = {};
        if (req.session.userInfo) {
            req.headers.logFrom = req.session.userInfo.user_id;
        } else {
            req.headers.logFrom = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
            req.headers.logFrom = req.headers.logFrom ? req.headers.logFrom.join('.') : null;
        }
        if(req.method == 'GET') data.params = req.query;
        if(req.method == 'POST') data.params = req.body;
        req.headers.logStartTime = moment();
        data.value = [req.headers.logFrom,req.route.path,req.method,JSON.stringify(data.params),null,req.headers.logStartTime.format('YYYY-MM-DD HH:mm:ss:SSS'),null,null];
        data.insert = await querySystem('system_api_log', 'insert', data.value);
        if (data.insert.success) { next() } else { throw data.insert.msg };
    }catch(err){
        logger.error(req.url,err);
        res.send(msg.failedMsg(err));
    }
}

// 是否维护
module.exports.isShutdown = function(req,res,next){
    let time = moment().format('YYYY-MM-DD HH:mm');
    if(time>'2020-04-28 21:45' && time<'2020-04-28 23:45'){
        res.send(msg.failedMsg(null, null, 'BI维护中...'));
    }else{
        next();
    }
}