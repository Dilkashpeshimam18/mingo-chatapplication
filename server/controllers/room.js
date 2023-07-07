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

exports.deleteRoom = async (req, res) => {
    try {
        const userid = req.user.id
        const roomId = req.params.id
        const room = await Room.findByPk(roomId)
        if (room.userId == userid) {
            await room.destroy()
            return res.status(200).json('Deleted Successfully!')

        } else {
            throw new Error('Something went wrong!')

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'SOMETHING WENT WRONG' })

    }
}
exports.editRoom = async (req, res) => {
    try {
        const { roomName, roomUrl } = req.body
        const userid = req.user.id
        const roomId = req.params.id
        const room = await Room.findByPk(roomId)
        if (room.userId == userid) {
            await room.update({ roomname: roomName, roomicon: roomUrl })
            res.status(200).json({ message: 'Update Successfull' })
        } else {
            throw new Error('Something went wrong!')

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'SOMETHING WENT WRONG' })

    }
}