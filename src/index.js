const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const usersRoutes = require('./routes/users')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/api-rest-exercise', {
    useNewUrlParser: true,
    useCreateIndex: true,
})

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

// routes
app.use('/users', usersRoutes)

// start the server
app.listen(app.get('port'), () => {
})