const asyncHandler = require('express-async-handler')
const ChatRoom = require('../models/chatRoomModel')

// @desc    Get chat rooms
// @route   GET /api/chatrooms
// @access  Private
const getChatRooms = asyncHandler( async (req, res) => {
    const chatRoom = await ChatRoom.find();
    res.status(200).json(chatRoom)
})


// @desc    Add a chat room
// @route   POST /api/chatrooms
// @access  Private
const addChatRoom = asyncHandler( async (req, res) => {
    const chatRoom = await ChatRoom.create({
        
    });
    res.status(200).json(chatRoom)
})



module.exports = {
    getChatRooms,
    addChatRoom
}