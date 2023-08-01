const express = require('express')
const messageController = require('../controllers/message')
const { authenticate } = require('../middleware/auth')
const router = express.Router()
const multer = require('multer');

const upload = multer();

router.get('/get-messages/:roomId', messageController.getMessage)
router.post('/upload-files/:roomId', authenticate, upload.single('file'), messageController.uploadFiles);
router.post('/add-message', authenticate, messageController.addMessage)

module.exports = router