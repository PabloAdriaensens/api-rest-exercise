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
  getUnreadMessages,
} = require('../controllers/user')

router.get('/', index)
router.post('/', newUser)

router.get('/:userId', getUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

router.post('/:userId/messages', newMessage)
router.get('/:userId/messages', getMessages)

router.get('/typeMessages', getTypeMessages)
router.get('/unreadMessages', getUnreadMessages)

module.exports = router
