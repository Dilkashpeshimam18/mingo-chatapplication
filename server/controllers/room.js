const Room = require('../models/room')
const { randomUUID } = require('crypto')

exports.createRoom = async (req, res) => {
    try {
        const id = req.user.id
        const data = req.body

        const room = await Room.create({
            id: randomUUID(),
            roomname: data.roomName,
            roomicon: data.roomUrl,
            userId: id
        })

        res.status(200).json({ success: true, message: 'Room created!' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getRoom = async (req, res) => {
    try {
        const id = req.user.id
        const room = await Room.findAll({ where: { userId: id } })
        res.status(200).json({ success: true, room })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}