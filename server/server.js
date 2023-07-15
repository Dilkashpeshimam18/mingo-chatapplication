const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize = require('./utils/db')
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/message')
const roomRoutes = require('./routes/room')
const userRoutes = require('./routes/user')
const memberRoutes = require('./routes/member')
const Users = require('./models/user')
const Messages = require('./models/message')
const Room = require('./models/room')
const Member = require('./models/member')

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
app.use('/room', roomRoutes)
app.use('/user', userRoutes)
app.use('/member', memberRoutes)

Users.hasMany(Messages)
Messages.belongsTo(Users)

Users.hasMany(Room)
Room.belongsTo(Users)

Room.hasMany(Member)
Member.belongsTo(Room)

Room.hasMany(Messages)
Messages.belongsTo(Room)

Users.hasMany(Member)
Member.belongsTo(Users)

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('SERVER RUNNING!')
    })
}).catch((err) => {
    console.log(err)
})
