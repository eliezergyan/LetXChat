const router = require('express').Router()
const { registerUser, loginUser } = require('../controllers/userContoller')

// Creating User
// Unique email not working
// Fix it later
router.post('/', registerUser)


// Login User
router.post('/login', loginUser)

module.exports = router