const Member = require('../models/member')
const { randomUUID } = require('crypto')

exports.addMember = async (req, res) => {
    try {
        const data = req.body
        const roomId = req.params.roomid
        console.log(data)
        const member = await Member.create({
            id: randomUUID(),
            name: data.name,
            email: data.email,
            photoUrl: data.photoUrl,
            isAdmin: data.isAdmin,
            roomId: roomId
        })

        res.status(200).json({ success: true })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getMember = async (req, res) => {
    try {
        const roomId = req.params.roomId
        const member = await Member.findAll({
            where: {
                roomId: roomId
            }
        })
        res.status(200).json({ success: true, data: member })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.removeMember = async (req, res) => {
    try {
        const roomId = req.params.roomId
        const memberId = req.params.memberId

        const member = await Member.findOne({
            where: {
                roomId: roomId,
                id: memberId

            }
        })

        await member.destroy()
        res.status(200).json({ success: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}