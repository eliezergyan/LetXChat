const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, staffId, username, staffEmail, avatar, password } = req.body

    if( !name || !staffId || !username || !staffEmail || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const emailExists = await User.findOne({'staffEmail': staffEmail, 'username': username, 'staffId': staffId})
    const usernameExists = await User.findOne({'staffEmail': staffEmail, 'username': username, 'staffId': staffId})
    const staffIdExists = await User.findOne({'staffEmail': staffEmail, 'username': username, 'staffId': staffId})

    if(emailExists){
        res.status(400)
        throw new Error('Staff email already exists')
    } 
    if(usernameExists){
        res.status(400)
        throw new Error('Username already exists')  
    }
    if(staffIdExists){
        res.status(400)
        throw new Error('Staff ID already exists')   
    }


    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        staffId,
        username,
        staffEmail,
        avatar,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.staffEmail,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
    const { staffEmail, staffId, password} = req.body

    // Check for user email
    const user = await User.findOne({staffEmail})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.staffEmail,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler( async (req, res) => {
    res.json({'message': 'User data display'})
})

// @desc    Update user details
// @route   PUT /api/users/profile
// @access  Private
const updateUserData = asyncHandler( async (req, res) => {
    res.json({'message': 'Update data'})
})



// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    getMe,
    loginUser,
    updateUserData
}