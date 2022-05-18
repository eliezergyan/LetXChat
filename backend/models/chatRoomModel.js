const mongoose = require('mongoose');

const chatRoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name for the chat room']
    },
    avatar: {
        data: Buffer,
        contentType: String
    },
    members : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, 
{
    timestamps: true
})


module.exports = mongoose.model('ChatRoom', chatRoomSchema);