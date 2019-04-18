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
      res.status(404).json('The requested URL was not found on this server')
    }
  },

  getSenderMessages: async (req, res, next) => {
    try {
      const senderMessages = await Message.find({}, {
        'sender': 1,
      })
      res.status(200).json(senderMessages)
    } catch (err) {
      res.status(404).json('The requested URL was not found on this server')
    }
  },

  getUnreadMessages: async (req, res, next) => {
    try {
      const unreadMessages = await Message.find({
        readed: false,
      })
      res.status(200).json(unreadMessages)
    } catch (err) {
      res.status(404).json('The requested URL was not found on this server')
    }
  },

  getMostMessages: async (req, res, next) => {
    try {
      const mostMessages = await Message.aggregate([{
        $project: {
          item: 1,
          numberOfMessages: {
            $cond: {
              if: {
                $isArray: '$messages',
              },
              then: {
                $size: '$messages',
              },
              else: 'NA',
            },
          },
        },
      },
      {
        $sort: {
          numberOfMessages: -1,
        },
      }, {
        $limit: 3,
      },
      ])

      res.status(200).json(mostMessages)
    } catch (err) {
      res.status(404).json('The requested URL was not found on this server')
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
      res.status(404).json('The requested URL was not found on this server')
    }
  },

}
