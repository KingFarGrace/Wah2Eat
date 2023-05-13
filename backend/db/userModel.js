const mongoose = require('./index')

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    gender: {
        type: String,
        default: 'Unknown.'
    },
    height: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    }
})

module.exports.userModel = mongoose.model('user', userSchema, 'user')