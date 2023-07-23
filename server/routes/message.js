const express = require('express')
const messageController = require('../controllers/message')
const { authenticate } = require('../middleware/auth')
const router = express.Router()

router.get('/get-messages/:roomId', messageController.getMessage)
router.get('/upload-files',authenticate,messageController.uploadFiles)
router.post('/add-message', authenticate, messageController.addMessage)

module.exports = router