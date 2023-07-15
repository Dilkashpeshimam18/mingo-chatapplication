const Member = require('../models/member')
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

        res.status(200).json({ success: true, message: room })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getRoom = async (req, res) => {
    try {
        const id = req.user.id
        const email = req.user.email

        const member = await Member.findAll({ where: { email: email } })
        let room = [];
        const allRoom = await Promise.all(member.map(async (mem) => {
            const roomId = mem.dataValues.roomId;
            const response = await Room.findAll({ where: { id: roomId } });
            return response;
        }));
        room = allRoom.flat();

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
exports.changeAdmin = async (req, res) => {
    try {
        const roomId = req.params.roomId
        const user = req.user
        const userId = req.params.userId

        const room = await Room.findByPk(roomId)
        await room.update({ userId: userId })

        const member = await Member.findOne({
            where: {
                roomId: roomId,
                userId: user.id
            }
        })

        await member.update({ isAdmin: false })

        const updateAdmin = await Member.findOne({
            where: {
                roomId: roomId,
                userId: userId
            }
        })
        await updateAdmin.update({ isAdmin: true })
        res.status(200).json({ success: true, message: 'Room admin change!' })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'SOMETHING WENT WRONG' })

    }
}