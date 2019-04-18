const User = require('../models/user')

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
    res.status(200).json({
      success: true,
    })
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
}
