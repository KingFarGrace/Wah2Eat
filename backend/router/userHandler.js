const verify = require('../utils/validateUtil').verify
const rtnFailedJson = require('../utils/jsonUtil').rtnFailedJson
const rtnSuccessJson = require('../utils/jsonUtil').rtnSuccessJson
const updateSchema = require('../validation_schema/userSchema').updateSchema
const updatePwdSchema = require('../validation_schema/userSchema').updatePwdSchema
const loginSchema = require('../validation_schema/userSchema').loginSchema
const registerSchema = require('../validation_schema/userSchema').registerSchema
const userModel = require('../db/userModel').userModel

function login(req, res) {
    var body = req.body
    var { msg, valid } = verify(loginSchema, body)
    if (!valid) return rtnFailedJson(res, msg)
    userModel.findOne({ email: body.email }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data === null) return rtnFailedJson(res, 'Email not found, would you like to register now?')
        if (body.password !== data.password) return rtnFailedJson(res, 'Wrong password!')
        return rtnSuccessJson(
            res, 
            'Login successfully.',
            {
                email: data.email,
                username: data.username,
                gender: data.gender,
                height: data.height,
                weight: data.weight
            }
        )
    })
}

function register(req, res) {
    var body = req.body
    var { msg, valid } = verify(registerSchema, body)
    if (!valid) return rtnFailedJson(res, msg)
    userModel.findOne({ email: body.email }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data !== null) return rtnFailedJson(res, 'This email address has been signed up, please change one or retrieve your password.')
        var userData = new userModel(body)
        userData.save().then((data, err) => {
            if (err) return rtnFailedJson(res, 'Server error, please try later.')
        })
    })
    return rtnSuccessJson(res, 'Registered successfully, you can login now.')
}

function update(req, res) {
    var body = req.body
    var { msg, valid } = verify(updateSchema, body)
    if (!valid) return rtnFailedJson(res, msg)
    userModel.updateOne(
        { email: body.email }, 
        { 
            username: body.username, 
            gender: body.gender, 
            height: body.height, 
            weight: body.weight 
        }
    ).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
    })
    return rtnSuccessJson(res, 'Update successfully.')
}

function updatePwd(req, res) {
    var body = req.body
    var { msg, valid } = verify(updatePwdSchema, body)
    if (!valid) return rtnFailedJson(res, msg)
    userModel.findOne({ email: body.email }).then((data, err) => {
        if (err) return rtnFailedJson(res, 'Server error, please try later.')
        if (data === null) return rtnFailedJson(res, 'Email address not found.')
        if (data.password !== body.oldPwd) return rtnFailedJson(res, 'Wrong password!')
        userModel.updateOne({ email: body.email }, { password: body.newPwd }).then((data, err) => {
            if(err) return rtnFailedJson(res, 'Server error, please try later.')
        })
    })
    return rtnSuccessJson(res, 'Updata password successfully.')
}

module.exports.login = login
module.exports.register = register
module.exports.update = update
module.exports.updatePwd = updatePwd