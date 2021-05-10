var mysql = require('mysql');
var faker = require('faker');
var moment = require('moment');
var logger = require('log4js').getLogger();
var msg = require('../utils/msg');

var tv = require('../utils/token_vertify');
var ding = require('../utils/dd_sdk');

var escape = require('mysql').escape;

var testDB = {
    id: 0,
    username: 'admin',
    password: 'hm12345678',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin'],
  }

/**
 * postLogin
 * 登入
 * @param  {string}
 */
module.exports.systemLogin = async function (req,res){
    try{
        let reqBody = req.body
        // //获取钉钉token 时效7200s
        // let dingResult = await ding.getAccessToken()
        // if(dingResult.errcode == 0) {
        //     //写入session 时效7200s
        //     req.session.userInfo = {
        //         id: 0,
        //         username: 'admin',
        //         password: 'hm12345678',
        //         name: 'Super Admin',
        //         avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        //         introduction: 'I am a super administrator',
        //         email: 'admin@test.com',
        //         phone: '1234567890',
        //         roles: ['admin'],
        //         access_token: dingResult.access_token
        //     }
        //     tv.setToken(testDB).then((data)=>{
        //         res.send({
        //             code: 20000,
        //             data: {
        //                 accessToken: 'Bearer ' + data
        //             }
        //         });
        //     })
        // }else{
        //     res.send(dingResult);
        // }
        if(reqBody.password == '4b9e5fb09ef23bf0bfb6f691b092e4f0') {
            req.session.userInfo = testDB
            tv.setToken(testDB).then((data)=>{
                let db = { accessToken: 'Bearer ' + data, session:req.session }
                res.send(msg.successMsg(20000, db, ''))
            })
        }else{
            res.send(msg.failedMsg(50000, '', '密码错误，请重新输入'));
        }
    }catch(err){
        logger.error(req.url,err);
        res.send(msg.failedMsg(err));
    }
}

/**
 * logout
 * 退出登录
 */
module.exports.systemLogout = function(req,res){
    req.session.destroy(function(err) {
        if(err){
            res.send(msg.failedMsg(''));
        }else{
            res.send({
                code: 20000
            });
        }
    });
}

/**
 * getUserInfo
 * 获取用户信息
 */
module.exports.getUserInfo = function(req,res){
    try{
        res.send({
            code: 20000,
            data: {
                user: req.session.userInfo
            }
        });
    }catch(err){
        logger.error(req.url,err);
        res.send(msg.failedMsg(err));
    }
}