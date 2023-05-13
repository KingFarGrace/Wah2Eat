const rtnFailedJson = require('../utils/jsonUtil').rtnFailedJson
const rtnSuccessJson = require('../utils/jsonUtil').rtnSuccessJson

const foodModel = require('../db/foodModel').foodModel

function searchFoodDetail(req, res) {
    var query = req.query
    const queryReg = new RegExp(query.FoodName, 'i')
    // TODO: page
    foodModel.find({ FoodName: { $regex: queryReg } }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data.length === 0) return rtnFailedJson(res, 'No matched results.')
        return rtnSuccessJson(res, 'Results successfully searched.', data)
    })
}

function searchFoodPrice(req, res) {
    var query = req.query
}

module.exports.searchFoodDetail = searchFoodDetail
module.exports.searchFoodPrice = searchFoodPrice