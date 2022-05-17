const asyncHandler = require('express-async-handler')


// @desc    Get messages
// @route   GET /api/messages
// @access  Public

const getMessages = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'get messages' })
})

// @desc    Create a message
// @route   POST /api/messages
// @access  Public

const createMessage = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'create a message' })
})

// @desc    Edit message
// @route   PUT /api/messages/:id
// @access  Public

const updateMessage = asyncHandler( async (req, res) => {
    res.status(201).json({ message: `edit message with id ${req.params.id}` })
})

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Public

const deleteMessage = asyncHandler( async (req, res) => {
    res.status(404).json({ message: `delete message with id ${req.params.id}` })
})



module.exports = {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage
}