const express = require('express')
const router = express.Router()
const searchFoodPrice = require('./foodSearchHandler').searchFoodPrice

router.get('/search', searchFoodPrice)

module.exports = router