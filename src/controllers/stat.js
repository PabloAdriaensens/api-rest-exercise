const Message = require('../models/message')

module.exports = {

  getTypeMessages: async (req, res, next) => {
    try {
      const messageTypes = await Message.find({
        type: {
          $in: ['feedback', 'bug'],
        },
      }, {
        'type': 1,
      })
      res.status(200).json(messageTypes)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  getSenderMessages: async (req, res, next) => {
    try {
      const senderMessages = await Message.find({}, {
        'sender': 1,
      })
      res.status(200).json(senderMessages)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  getUnreadMessages: async (req, res, next) => {
    try {
      const unreadMessages = await Message.find({
        readed: false,
      })
      res.status(200).json(unreadMessages)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  getMostMessages: async (req, res, next) => {
    try {
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
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  getPepinoMessages: async (req, res, next) => {
    try {
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
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

}
