const rtnFailedJson = require('../utils/jsonUtil').rtnFailedJson
const rtnSuccessJson = require('../utils/jsonUtil').rtnSuccessJson
const foodModel = require('../db/foodModel').foodModel
const priceModel = require('../db/priceModel').priceModel

function searchFoodDetail(req, res) {
    var query = req.query
    const queryReg = new RegExp(query.FoodName, 'i')
    // TODO: paging
    foodModel.find({ FoodName: { $regex: queryReg } }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data.length === 0) return rtnFailedJson(res, 'No matched results.')
        return rtnSuccessJson(res, 'Successfully get results.', data)
    })
}

function searchFoodPrice(req, res) {
    var query = req.query
    const queryReg = new RegExp(query.FoodName, 'i')
    priceModel.find({ FoodName: {$regex: queryReg} }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data.length === 0) return rtnFailedJson(res, 'No matched results.')
        return rtnSuccessJson(res, 'Successfully get results.', data)
    })
}

module.exports.searchFoodDetail = searchFoodDetail
module.exports.searchFoodPrice = searchFoodPrice