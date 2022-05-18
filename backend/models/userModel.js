const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your lastname']
    },
    staffId: {
        type: Number,
        required: [true, 'Please add your Staff ID']
    },
    username: {
        type: String,
        requires: [true, 'Please add a username']
    },
    staffEmail: {
        type: String,
        required: [true, 'Please add your Staff email']
    },
    avatar: {
        data: Buffer,
        contentType: String
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
},
{
    timestamps: true,
})


module.exports = mongoose.model('User', userSchema)
