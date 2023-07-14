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
            roomId: roomId
        })

        res.status(200).json({ success: true })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}