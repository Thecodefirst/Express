var fs = require('fs');
var path = require('path');
var xlsx = require('node-xlsx').default;
var logger = require('log4js').getLogger();
var msg = require('./message');

/**
 * @description 创建文件目录，生成文件
 * @param  {string} file                   参数
 */
module.exports = async function (data){
    try{
        //创建目录
        var create_dir = (data) => new Promise((resolve, reject) => {
            try {
                fs.exists(data.xlsx_path,function(exists){
                    if(!exists) {
                        mkdirs(data.xlsx_path,function(){
                            resolve(data);
                        });
                    }else{
                        resolve(data);
                    }
                });
            } catch(err) {
                reject(data.xlsx_path + ' :生成目录失败');
            }
        })
        //生成文件
        var create_file = (data) => new Promise((resolve, reject) => {
            var buffer = xlsx.build([{name: data.build_name, data: data.result_data}],data.compress); 
            fs.writeFile(data.xlsx_path+data.xlsx_name, buffer, (err) => {
                if (err) {
                    reject('文件生成失败！');
                }else{
                    data.xlsx_path = data.xlsx_path.replace('public','');
                    resolve(data);
                }
            });
        })
        //创建目录
        await create_dir(data);
        //生成文件
        await create_file(data);
        return msg.successMsg('',{});
    }catch(err){
        return msg.failedMsg(err);
    }
}
//创建多级目录
function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
};