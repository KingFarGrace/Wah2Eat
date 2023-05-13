const mongoose = require('./index')

const priceSchema = mongoose.Schema({
    FoodName: String,
    ave: Number,
    max: Number,
    min: Number
})

module.exports.priceModel = mongoose.model('food_price', priceSchema, 'food_price')