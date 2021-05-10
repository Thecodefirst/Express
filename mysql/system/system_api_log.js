var mysql = [
    { id: 'insert', sql: 'INSERT INTO system_api_log  (`from`,route,method,params,result,start_time,end_time,ms) SELECT ?,?,?,?,?,?,?,?' }
]

module.exports = mysql;