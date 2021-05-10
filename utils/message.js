/**
 * 生成消息对象 通用模板
 * @param  {Boolean} success              成功消息or失败消息
 * @param  {String}  msg                  消息内容
 * @param  {Object}  data                 附加数据
 * @param  {Object}  meta                 附加元数据
 * @return {Object}                       消息对象
 */
exports.Msg = (success, msg, data = {}, meta = {}) => {
    msg = msg.toString();
    return {
        success: success,
        msg: msg,
        data: data,
        meta: meta
    }
}

exports.successMsg = (msg, data, meta) => {
    return this.Msg(true, msg, data, meta)
}

exports.failedMsg = (msg, data, meta) => {
    return this.Msg(false, msg, data, meta)
}
