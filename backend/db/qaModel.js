const mongoose = require('./index')

const qaSchema = mongoose.Schema({
    question: String,
    answer: String
})

module.exports.qaModel = mongoose.model('qa', qaSchema, 'qa')