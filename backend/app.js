const express = require('express')
const app = express()
const bodyParser = require('bodyParser')
app.use(bodyParser.json())


app.listen(3000, () => {
    console.log('Server running at http://localhost/3000')
})