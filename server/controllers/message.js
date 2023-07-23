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
            userId: id,
            roomId: data.roomId
        })

        res.status(200).json({ success: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getMessage = async (req, res) => {
    try {
        const lastmsgId = req.query.lastMsgId
        const roomId = req.params.roomId
        // const msgcount=await Messages.count()
        // const messages = await Messages.findAll({
        //     offset:Number(lastmsgId),
        //     limit:Number(msgcount)

        // })
        const messages = await Messages.findAll({
            where: { roomId: roomId },
            order: [['createdAt', 'ASC']]
        })
        res.status(200).json({ success: true, messages })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.uploadFiles=(req,res)=>{
    try{

        

    }catch(err){
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}