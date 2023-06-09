const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

/**
 * Build up routers.
 */
const userRouter = require('./router/user')
const foodRouter = require('./router/food')
const priceRouter = require('./router/price')
const qaRouter = require('./router/qa')
const planRouter = require('./router/plan')
app.use('/', userRouter)
app.use('/food', foodRouter)
app.use('/price', priceRouter)
app.use('/', qaRouter)
app.use('/user', planRouter)

// TODO: Cors

app.listen(3000, () => {
    console.log('Server running at http://localhost/3000')
})