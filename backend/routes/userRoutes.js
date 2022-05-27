const router = require('express').Router()
const { registerUser, loginUser,  editUserProfile } = require('../controllers/userContoller')


router.post('/', registerUser)

router.post('/login', loginUser)

router.put('/profile/:id', editUserProfile)

module.exports = router