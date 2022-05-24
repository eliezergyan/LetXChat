const User = require('../models/User')

// Unique email not working
const registerUser = async(req, res) => {
    try {
        const { name, email, password, employeeId, username, picture } = req.body
        console.log(req.body)
        const user = await User.create({ name, email, password, employeeId, username, picture })
        res.status(201).json(user)
    } catch (error) {
       let msg;
       if(error.code == 11000){
           msg = 'User already exists'
       } else {
           msg = error.message
       }
       console.log(error)
       res.status(400).json(msg)
    }
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        user.status = 'online'
        await user.save()
        res.status(200).json(user)
        
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = { registerUser, loginUser }