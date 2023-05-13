const joi = require('joi') 

module.exports.registerSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().alphanum().min(1).max(16).required(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,16}')).min(6).max(16).required(),
    repeatPwd: joi.ref('password')
})

module.exports.loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,16}')).min(6).max(16).required()
})

module.exports.updateSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().alphanum().min(1).max(16).required(),
    gender: joi.string().required(),
    height: joi.number().required(),
    weight: joi.number().required()
})

module.exports.updatePwdSchema = joi.object({
    email: joi.string().email().required(),
    oldPwd: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,16}')).min(6).max(16).required(),
    newPwd: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,16}')).min(6).max(16).required(),
    repeatNewPwd: joi.ref('newPwd')
})
