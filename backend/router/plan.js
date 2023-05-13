const express = require('express')
const router = express.Router()
const planHandler = require('./planHandler')

router.post('/plan', planHandler.setPlan)
router.get('/plan', planHandler.getPlan)

module.exports = router