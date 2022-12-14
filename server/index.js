const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
//middleware
app.use(cors())

//creating http server of our app

const server = http.createServer(app)


app.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    })
})
//creating instance of socket.io
const io = new Server(server, {
    cors: {
        origin: 'https://localhost:3000',
        methods: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on('join_room', (data) => {
        console.log(data)
        socket.join(data)
    })
    socket.on('send_message', (data) => {
        console.log(data)
        socket.to(data.isSelectedRoom).emit('receive_message', data.message)
    })
    socket.on('disconnect', () => {
        console.log('user disconnect', socket.id)
    })
})

server.listen(3001, () => {
    console.log('SERVER RUNNING  listening to 3001')
})

