const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    dropDups: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'message',
  }],
}, {
  timestamps: true,
})

module.exports = mongoose.model('user', userSchema)
