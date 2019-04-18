const express = require('express')
const router = express.Router()

const {
  newMessage,
  getMessages,
  updateMessages,
  deleteMessages,
} = require('../controllers/message')

router.post('/:userId', newMessage)
router.get('/:userId', getMessages)
router.put('/:messageId', updateMessages)
router.delete('/:messageId', deleteMessages)

module.exports = router
