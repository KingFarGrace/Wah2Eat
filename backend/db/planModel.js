const mongoose = require('./index')

const planSchema = mongoose.Schema({
    email: String,
    aimType: String,
    aimWeight: Number,
    periodLength: Number,
    stime: Date
})

module.exports.planModel = mongoose.model('plan', planSchema, 'plan')