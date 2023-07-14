const express = require('express')
const memberControllers = require('../controllers/member')
const { authenticate } = require('../middleware/auth')

const router = express.Router()

router.get('/get-member/:roomId',authenticate,memberControllers.getMember)
router.post('/add-member/:roomid',authenticate, memberControllers.addMember)

module.exports = router