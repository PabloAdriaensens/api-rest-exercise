const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  type: String,
  readed: Boolean,
  sender: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
})

module.exports = mongoose.model('message', messageSchema)
