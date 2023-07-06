const Messages = require('../models/message')
const { randomUUID } = require('crypto')

exports.addMessage = async (req, res) => {
    try {
        const id = req.user.id
        const data = req.body

        const message = await Messages.create({
            id: randomUUID(),
            username: data.username,
            email: data.email,
            photoUrl: data.image,
            message: data.message,
            userId: id
        })

        res.status(200).json({ success: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getMessage = async (req, res) => {
    try {
        const lastmsgId=req.query.lastMsgId
        // const msgcount=await Messages.count()
        // const messages = await Messages.findAll({
        //     offset:Number(lastmsgId),
        //     limit:Number(msgcount)

        // })
        const messages = await Messages.findAll()
        res.status(200).json({ success: true,messages})

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}
