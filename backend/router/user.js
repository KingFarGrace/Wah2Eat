const express = require('express')
const router = express.Router()
const userHandler = require('./userHandler')

router.post("/login", userHandler.login)

router.post("/register", userHandler.register)

router.post("/user/update", userHandler.update)

router.post("/user/update/pwd", userHandler.updatePwd)

module.exports = router