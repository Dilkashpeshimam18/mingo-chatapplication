const express = require('express')
const authControllers = require('../controllers/auth')

const router = express.Router()

router.post('/sign-up', authControllers.postSignup)
router.post('/login', authControllers.postLogin)

module.exports = router