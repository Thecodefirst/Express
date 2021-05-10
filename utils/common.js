//格式化时间
/**
 * 
 * @param {*} db 表名
 * @param {*} db_key 字段数组
 * @param {*} format 格式
 * @param {*} asKey 指定列名
 */
module.exports.timeStr = function(db,db_key,format,asKey) {
  let result = ''
  for(let i=0,arr=db_key;i<arr.length;i++) {
    let newStr = ` DATE_FORMAT(${db}.${db_key[i]},'${format}') AS ${asKey[i]}`
    if(i==arr.length - 1) {
      result += newStr
    }else{
      result += newStr + ','
    }
  }
  return result
}