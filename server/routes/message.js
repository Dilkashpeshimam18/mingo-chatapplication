const express = require('express')
const messageController = require('../controllers/message')
const { authenticate } = require('../middleware/auth')
const router = express.Router()
const multer = require('multer');

const upload = multer();

router.get('/get-messages/:roomId', messageController.getMessage)
router.get('/get-uploadedFiles/:roomId', messageController.getUploadedFiles)
router.post('/upload-files/:roomId/:msgId', authenticate, upload.single('file'), messageController.uploadFiles);
router.post('/store-files', authenticate, messageController.storeFiles)
router.post('/add-message', authenticate, messageController.addMessage)

module.exports = router