const asyncHandler = require('express-async-handler')

const Message = require('../models/messageModel')

// @desc    Get messages
// @route   GET /api/messages
// @access  Private

const getMessages = asyncHandler( async (req, res) => {
    const messages = await Message.find();

    res.status(200).json(messages)
})

// @desc    Create a message
// @route   POST /api/messages
// @access  Private

const createMessage = asyncHandler( async (req, res) => {
    const message = await Message.create({
        user,
        chatroom,
        messageBody: req.body.text,
        messageStatus,
    })

    res.status(200).json(message)
})

// @desc    Edit message
// @route   PUT /api/messages/:id
// @access  Private

const updateMessage = asyncHandler( async (req, res) => {
    res.status(201).json({ message: `edit message with id ${req.params.id}` })
})

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private

const deleteMessage = asyncHandler( async (req, res) => {
    res.status(404).json({ message: `delete message with id ${req.params.id}` })
})



module.exports = {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage
}