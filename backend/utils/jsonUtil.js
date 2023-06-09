function rtnJson(res, msg, isSuccess) {
    return res.json(
        JSON.stringify(
            {
                msg: msg,
                success: isSuccess
            }
        )
    )
}

function rtnJson(res, msg, isSuccess, obj) {
    return res.json(
        JSON.stringify(
            {
                msg: msg,
                success: isSuccess,
                obj: obj
            }
        )
    )
}

function rtnSuccessJson(res, msg) {
    return rtnJson(res, msg, true)
} 

function rtnSuccessJson(res, msg, obj) {
    return rtnJson(res, msg, true, obj)
}

function rtnFailedJson(res, msg) {
    return rtnJson(res, msg, false)
}

module.exports.rtnJson = rtnJson
module.exports.rtnFailedJson = rtnFailedJson
module.exports.rtnSuccessJson = rtnSuccessJson