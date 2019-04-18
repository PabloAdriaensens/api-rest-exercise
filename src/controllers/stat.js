const Message = require('../models/message')

module.exports = {

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
