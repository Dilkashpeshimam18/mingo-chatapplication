const express=require('express')
const authControllers=require('../controllers/auth')
const { authenticate } = require('../middleware/auth')

const router=express.Router()

router.post('/sign-up',authControllers.postSignup)
router.post('/login',authControllers.postLogin)
router.post('/edit-userprofile',authenticate,authControllers.editUserProfile)

module.exports=router