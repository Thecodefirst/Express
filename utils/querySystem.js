var mysql = require('mysql');
var logger = require('log4js').getLogger();
var msg = require('./message');
var db = require('../config/db_system');
var pool = mysql.createPool(db.mysql);

/**
 * @description 执行Mysql
 * @param  {string} table                    表名（为空则直接执行sql内容）
 * @param  {string} sql                      sql id/sql
 * @param  {string} values                   参数
 */
module.exports = async function (table,sql,values){
    try{
        var doQuery = (table,sql,values) => new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if(err) reject(err);
                connection.query(sql,values,function(err, result) {
                    if(err) reject(err)
                    data.result = result;
                    resolve(data);
                    connection.release();
                });
            });
        });

        var data = {};
        if(table==''){
            data.table = 'Sql';
            data.sql = sql;
        }else{
            data.table = table+':'+sql;
            data.mysql = require('../mysql/system/'+table);
            data.mysql.forEach((n,i)=>{
                if(n.id==sql) data.sql=n.sql
            });
        }
        if(!data.sql) throw table+':'+sql+' is null.';
        await doQuery(data.table,data.sql,values);
        return msg.successMsg('',{result:data.result});
    }catch(err){
        logger.error(JSON.stringify(err));
        return msg.failedMsg(err);
    }
}