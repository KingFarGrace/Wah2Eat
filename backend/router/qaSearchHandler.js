const rtnFailedJson = require('../utils/jsonUtil').rtnFailedJson
const rtnSuccessJson = require('../utils/jsonUtil').rtnSuccessJson
const qaModel = require('../db/qaModel').qaModel

function searchAnswer(req, res) {
    var keyword = req.query.keyword
    const queryReg = new RegExp(keyword, 'i')
    qaModel.find({ question: { $regex: queryReg } }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data.length === 0) return rtnFailedJson(res, 'No matched results.')
        return rtnSuccessJson(res, 'Successfully get results.', data)
    })
}

module.exports.searchAnswer = searchAnswer