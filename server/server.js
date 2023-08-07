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
const { Server } = require('socket.io')
const http = require('http')
const ArchivedMessage = require('./models/archiveMessage')
const app = express()


app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }))
app.use(bodyParser.json({limit: "50mb"}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,

}))
dotenv.config()

const server = http.createServer(app)


app.use('/auth', authRoutes)
app.use('/message', messageRoutes)
app.use('/room', roomRoutes)
app.use('/user', userRoutes)
app.use('/member', memberRoutes)

Users.hasMany(Messages)
Messages.belongsTo(Users)

Users.hasMany(ArchivedMessage)
ArchivedMessage.belongsTo(Users)

Users.hasMany(Room)
Room.belongsTo(Users)

Room.hasMany(Member)
Member.belongsTo(Room)

Room.hasMany(Messages)
Messages.belongsTo(Room)

Room.hasMany(ArchivedMessage)
ArchivedMessage.belongsTo(Room)

Users.hasMany(Member)
Member.belongsTo(Users)

const io = new Server(server, {
    cors: {
        origin: 'https://localhost:3000',
        methods: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {

    socket.on('join-room', (data) => {
        socket.join(data.roomId)
    })

    socket.on('send-message', async (message, room, cb) => {
        if (room == '') {
            socket.broadcast.emit('receive-message', message)
            cb(message)

        } else {
            await socket.to(room).emit('receive-message', message)
            cb(message)
        }
    })

})

sequelize.sync().then(() => {
    server.listen(4000, () => {
        console.log('SERVER RUNNING!')
    })
}).catch((err) => {
    console.log(err)
})
