const express = require('express')
const roomControllers = require('../controllers/room')
const { authenticate } = require('../middleware/auth')

const router = express.Router()

router.get('/get-room',authenticate,roomControllers.getRoom)
router.post('/create-room',authenticate,roomControllers.createRoom)

module.exports=router