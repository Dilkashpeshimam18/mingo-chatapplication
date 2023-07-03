const express=require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const app=express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.listen(4000,()=>{
    console.log('SERVER RUNNING!!')
})