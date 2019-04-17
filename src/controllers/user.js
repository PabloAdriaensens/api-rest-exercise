const User = require('../models/user')
const Message = require('../models/message')

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      throw new Error(err)
    }
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.body)
    const user = await newUser.save()
    res.status(200).json(user)
  },

  getUser: async (req, res, next) => {
    const {
      userId,
    } = req.params
    const user = await User.findById(userId)
    res.status(200).json(user)
  },

  updateUser: async (req, res, next) => {
    const {
      userId,
    } = req.params
    const newUser = req.body
    // eslint-disable-next-line no-unused-vars
    const oldUser = await User.findByIdAndUpdate(userId, newUser)
    res.status(200).json({ success: true })
  },

  deleteUser: async (req, res, next) => {
    const {
      userId,
    } = req.params
    await User.findByIdAndRemove(userId)
    res.status(200).json({
      success: true,
    })
  },

  newMessage: async (req, res, next) => {
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
  },

  getMessages: async (req, res, next) => {
    const {
      userId,
    } = req.params
    const user = await User.findById(userId).populate('messages')
    res.status(200).json(user)
  },

  getTypeMessages: async (req, res, next) => {
    const messageTypes = await Message.find({ type: { $in: [ 'feedback', 'bug' ] } }, { 'type': 1 })
    res.status(200).json(messageTypes)
  },

  getUnreadMessages: async (req, res, next) => {
    const messageTypes = await Message.find({ readed: false })
    res.status(200).json(messageTypes)
  },
}
