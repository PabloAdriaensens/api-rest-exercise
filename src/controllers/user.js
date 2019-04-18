const User = require('../models/user')

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  newUser: async (req, res, next) => {
    try {
      const newUser = new User(req.body)
      const user = await newUser.save()
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  getUser: async (req, res, next) => {
    try {
      const {
        userId,
      } = req.params
      const user = await User.findById(userId)
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {
        userId,
      } = req.params
      const newUser = req.body
      // eslint-disable-next-line no-unused-vars
      const oldUser = await User.findByIdAndUpdate(userId, newUser)
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {
        userId,
      } = req.params
      await User.findByIdAndRemove(userId)
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}
