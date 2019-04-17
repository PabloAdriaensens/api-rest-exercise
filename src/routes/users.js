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
} = require('../controllers/user')

router.get('/', index)
router.post('/', newUser)

router.get('/:userId', getUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

router.post('/:userId/messages', newMessage)
router.get('/:userId/messages', getMessages)

module.exports = router
