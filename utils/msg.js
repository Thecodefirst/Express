/**
 * 生成消息对象 通用模板
 */

exports.Msg = (code, data, msg) => {
    msg = msg.toString();
    return {
        code: code,
        data: data,
        msg: msg
    }
}

exports.successMsg = (code, data, msg) => {
    data.status = 'success'
    return this.Msg(code, data, msg)
}

exports.failedMsg = (code, data, msg) => {
    data.status = 'failed'
    return this.Msg(code, data, msg)
}
