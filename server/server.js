const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize = require('./utils/db')
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/message')
const Users = require('./models/user')
const Messages = require('./models/message')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,

}))
dotenv.config()

app.use('/auth', authRoutes)
app.use('/message', messageRoutes)

Users.hasMany(Messages)
Messages.belongsTo(Users)

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('SERVER RUNNING!')
    })
}).catch((err) => {
    console.log(err)
})
