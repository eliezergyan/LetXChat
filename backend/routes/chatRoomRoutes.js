const express = require('express')
const router = express.Router()
const { addChatRoom, getChatRooms } = require('../controllers/chatRoomControllers')

router.route('/').post(addChatRoom).get(getChatRooms)

// Edit and Delete a chat room
// Will be added after completing the main requirements

module.exports = router