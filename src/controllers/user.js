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

  getTypeMessages: async (req, res, next) => {
    const messageTypes = await Message.find({
      type: {
        $in: ['feedback', 'bug'],
      },
    }, {
      'type': 1,
    })
    res.status(200).json(messageTypes)
  },

  getSenderMessages: async (req, res, next) => {
    const senderMessages = await Message.find({}, {
      'sender': 1,
    })
    res.status(200).json(senderMessages)
  },

  getUnreadMessages: async (req, res, next) => {
    const unreadMessages = await Message.find({
      readed: false,
    })
    res.status(200).json(unreadMessages)
  },

  getMostMessages: async (req, res, next) => {
    const mostMessages = await Message.aggregate([{
      $unwind: '$messages',
    },
    {
      $group: {
        type: '$messages',
        count: {
          $sum: 1,
        },
      },
    },
    {
      $limit: 3,
    },
    ])
    res.status(200).json(mostMessages)
  },

  getPepinoMessages: async (req, res, next) => {
    const pepinoMessages = await Message.find({
      $or: [{
        'body': {
          $regex: '.*pepino.*',
        },
      },
      {
        'subject': {
          $regex: '.*pepino.*',
        },
      },
      ],
    })
    res.status(200).json(pepinoMessages)
  },
}
