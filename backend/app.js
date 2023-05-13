const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const userRouter = require('./router/user')
app.use('/', userRouter)

app.listen(3000, () => {
    console.log('Server running at http://localhost/3000')
})