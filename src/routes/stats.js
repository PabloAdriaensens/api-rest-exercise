const express = require('express')
const router = express.Router()

const {
  getTypeMessages,
  getSenderMessages,
  getUnreadMessages,
  getMostMessages,
  getPepinoMessages,
} = require('../controllers/stat')

// Routes with fixed segments
router.get('/typeMessages', getTypeMessages)
router.get('/senderMessages', getSenderMessages)
router.get('/unreadMessages', getUnreadMessages)
router.get('/mostMessages', getMostMessages)
router.get('/pepinoMessages', getPepinoMessages)

module.exports = router
