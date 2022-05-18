const express = require('express')
const { registerUser, updateUserData, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/profile', updateUserData)

module.exports = router