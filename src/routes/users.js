const express = require('express')
const router = express.Router()

const {
  index,
  newUser,
  getUser,
  updateUser,
  deleteUser,
  newMessage,
  getMessages,
  getTypeMessages,
  getSenderMessages,
  getUnreadMessages,
  getMostMessages,
  getPepinoMessages,
} = require('../controllers/user')

router.get('/', index)
router.post('/', newUser)

router.get('/:userId', getUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

router.post('/:userId/messages', newMessage)
router.get('/:userId/messages', getMessages)

router.get('/typeMessages', getTypeMessages)
router.get('/senderMessages', getSenderMessages)
router.get('/unreadMessages', getUnreadMessages)
router.get('/mostMessages', getMostMessages)
router.get('/pepinoMessages', getPepinoMessages)

module.exports = router
