const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  description: {
    type: { type: String },
    subject: String,
    body: String,
  },
  readed: Boolean,
  sender: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
},
{ timestamps: true })

module.exports = mongoose.model('message', messageSchema)
