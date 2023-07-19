const express = require('express')
const memberControllers = require('../controllers/member')
const { authenticate } = require('../middleware/auth')

const router = express.Router()

router.get('/get-member/:roomId',authenticate,memberControllers.getMember)
router.get('/get-addMember/:roomId',authenticate,memberControllers.getAddMember)
router.post('/add-member/:roomid',authenticate, memberControllers.addMember)
router.delete('/remove-member/:roomId/:memberId',authenticate,memberControllers.removeMember)

module.exports = router