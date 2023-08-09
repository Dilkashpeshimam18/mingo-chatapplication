const { authenticate } = require('../middleware/auth')
const express = require('express')
const userControllers = require('../controllers/user')
const router = express.Router()

router.get('/get-alluser', authenticate,userControllers.getAllUser)
router.get('/get-singleUserInfo',authenticate,userControllers.getUser)
router.post('/edit-userprofile', authenticate, userControllers.editUserProfile)

module.exports = router