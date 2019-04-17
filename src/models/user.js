const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'message'
    }],
})

module.exports = mongoose.model('user', userSchema)