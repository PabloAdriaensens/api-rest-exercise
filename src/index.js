const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

// start the server
app.listen(app.get('port'), () => {
})