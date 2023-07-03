const express=require('express')

const router=express.Router()

router.post('/signup',authControllers.postSignup)
router.post('/login',authControllers.postLogin)

module.exports=router