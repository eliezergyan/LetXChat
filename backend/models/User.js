const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        lowercase: true,
        index: true,
        unique: true,
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    employeeId: {
        type: String,
        required: [true, 'Please enter your employee ID']
    },
    username: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'Please enter a username']
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


// Hashing the password of the user before saving it
UserSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})

// Remove password before sending user
UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

// Find user by email and password
UserSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email or password')

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error('invalid email or password')
    return user
}

const User = mongoose.model('User', UserSchema);

module.exports = User;