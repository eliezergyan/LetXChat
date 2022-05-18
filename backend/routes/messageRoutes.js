const express = require('express')
const router = express.Router()
const { getMessages, createMessage, updateMessage, deleteMessage } = require('../controllers/messageController')

const { protect } = require('../middleware/authMiddleware'  )


router.route('/').get(protect, getMessages).post(protect, createMessage)

router.route('/:id').put(protect, updateMessage).delete(protect, deleteMessage)


module.exports = router