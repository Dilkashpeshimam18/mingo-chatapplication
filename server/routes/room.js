const express = require('express')
const roomControllers = require('../controllers/room')
const { authenticate } = require('../middleware/auth')

const router = express.Router()

router.get('/get-room', authenticate, roomControllers.getRoom)
router.post('/create-room', authenticate, roomControllers.createRoom)
router.put('/edit-room/:id', authenticate, roomControllers.editRoom)
router.put('/change-room-admin/:roomId/:userId',authenticate,roomControllers.changeAdmin)
router.delete('/delete-room/:id', authenticate, roomControllers.deleteRoom)
router.delete('/leave-room/:roomId', authenticate, roomControllers.leaveRoom)

module.exports = router