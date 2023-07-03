const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize=require('./utils/db')
const authRoutes = require('./routes/auth')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

app.use('/auth', authRoutes)

sequelize.sync().then(()=>{
    app.listen(4000, () => {
        console.log('SERVER RUNNING!')
    })
}).catch((err)=>{
    console.log(err)
})
