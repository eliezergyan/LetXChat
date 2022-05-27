const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: Array,
    },
    createdBy: {
        type: String,
        required: true,
    }
}, 
{
    timestamps: true,
})


const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = ChatRoom;