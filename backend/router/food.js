const express = require('express')
const router = express.Router()
const searchFoodDetail = require('./foodSearchHandler').searchFoodDetail

router.get("/search", searchFoodDetail)

module.exports = router
