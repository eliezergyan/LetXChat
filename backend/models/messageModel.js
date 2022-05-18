const mongoose = require('mongoose');
const User = require('./userModel')
const ChatRoom = require('./chatRoomModel')

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ChatRoom',
    },
    messageBody: {
        type: String,
    },
    messageStatus: {
        type: Boolean,
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Message', messageSchema)