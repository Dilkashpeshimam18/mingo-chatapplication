const express = require('express')
const messageController = require('../controllers/message')
const { authenticate } = require('../middleware/auth')
const router = express.Router()

router.post('/add-message', authenticate, messageController.addMessage)

module.exports = router