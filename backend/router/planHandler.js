const planModel = require('../db/planModel').planModel
const rtnFailedJson = require('../utils/jsonUtil').rtnFailedJson
const rtnSuccessJson = require('../utils/jsonUtil').rtnSuccessJson

function setPlan(req, res) {
    var body = req.body
    planModel.create({
        email: body.email,
        aimType: body.aimType,
        aimWeight: body.aimWeight,
        periodLength: body.periodLength,
        stime: new Date()
    }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        return rtnSuccessJson(res, 'Successfully set a plan.')
    })
}

function getPlan(req, res) {
    var query = req.query
    planModel.findOne({ email: query.email }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data === null) rtnFailedJson(res, 'Failed to find diet plan.')
        var plan = makePlan(data.aimType, data.aimWeight, data.periodLength, data.stime)
        rtnSuccessJson(res, 'Here is your plan.', plan)
    })
}

/**
 * Return a plan object.
 * Structure of plan:[{ date, nutriReq: { xx, xx, ... } }, ...]
 * @param {String} aimType 
 * @param {Number} aimWeight 
 * @param {Number} periodLength 
 * @param {Date} stime
 */
function makePlan(aimType, aimWeight, periodLength, stime) {

}

module.exports.setPlan = setPlan
module.exports.getPlan = getPlan