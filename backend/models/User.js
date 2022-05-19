const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please enter an email'],
        index: true,
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    picture: {
        type: String,

    },
    newMessages: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: 'online'
    }
}, {minimize: false})


const User = mongoose.model('User', UserSchema);

module.exports = User;