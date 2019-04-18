const User = require('../models/user')
const Message = require('../models/message')

module.exports = {

  newMessage: async (req, res, next) => {
    try {
      const {
        userId,
      } = req.params
      const newMessage = new Message(req.body)
      const user = await User.findById(userId)
      newMessage.sender = user
      await newMessage.save()
      user.messages.push(newMessage)
      await user.save()
      res.status(201).json(newMessage)
    } catch (err) {
      res.status(404).json('The requested URL was not found on this server')
    }
  },

  getMessages: async (req, res, next) => {
    try {
      const {
        userId,
      } = req.params
      const user = await User.findById(userId).populate('messages')
      res.status(200).json(user)
    } catch (err) {
      res.status(404).json('The requested URL was not found on this server')
    }
  },

  updateMessages: async (req, res, next) => {
    try {
      const {
        messageId,
      } = req.params
      const updateInfo = req.body
      const resp = await Message.findByIdAndUpdate(messageId, updateInfo)
      res.status(200).json(resp)
    } catch (err) {
      res.status(404).json('The requested URL was not found on this server')
    }
  },

  deleteMessages: async (req, res, next) => {
    try {
      const {
        messageId,
      } = req.params
      await Message.findByIdAndRemove(messageId)
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(404).json('The requested URL was not found on this server')
    }
  },

}
