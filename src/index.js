const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/api-rest-exercise', {
    useNewUrlParser: true,
})

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

// start the server
app.listen(app.get('port'), () => {
})