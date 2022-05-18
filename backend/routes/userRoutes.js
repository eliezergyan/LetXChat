const express = require('express')
const { registerUser, updateUserData, loginUser, getMe } = require('../controllers/userController')

const router = express.Router();

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)
router.put('/profile', updateUserData)

module.exports = router