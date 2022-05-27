const express = require('express');
const router = express.Router();
const { createChatRoom, getChatRooms } = require('../controllers/chatRoomController')

router.post('/', createChatRoom)

router.get('/', getChatRooms);

module.exports = router;