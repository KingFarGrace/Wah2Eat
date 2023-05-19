const express = require('express')
const searchAnswer = require('./qaSearchHandler').searchAnswer
const router = express.Router()

router.get('/qa', searchAnswer)

module.exports = router