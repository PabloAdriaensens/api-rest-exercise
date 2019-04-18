const express = require('express')
const router = express.Router()

const {
  index,
  newUser,
  getUser,
  updateUser,
  deleteUser,
  getTypeMessages,
  getSenderMessages,
  getUnreadMessages,
  getMostMessages,
  getPepinoMessages,
} = require('../controllers/user')

router.get('/', index)
router.post('/', newUser)

// Routes with fixed segments
router.get('/typeMessages', getTypeMessages)
router.get('/senderMessages', getSenderMessages)
router.get('/unreadMessages', getUnreadMessages)
router.get('/mostMessages', getMostMessages)
router.get('/pepinoMessages', getPepinoMessages)

// Routes with variable segment
router.get('/:userId', getUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router
