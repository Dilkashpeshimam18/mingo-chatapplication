const Messages = require('../models/message')
const { randomUUID } = require('crypto')
const AWS = require('aws-sdk')
var multer = require('multer')

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
const uploadToS3 = async (data, fileName) => {
    try {
        let s3bucket = new AWS.S3({
            accessKeyId: process.env.IAM_USER_ACCESSKEY,
            secretAccessKey: process.env.IAM_USER_SECRETKEY,
        })
        var params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: data,
            ACL: 'public-read'
        }
        return new Promise((resolve, reject) => {
            s3bucket.upload(params, (err, res) => {
                if (err) {
                    console.log('Something went wrong', err)
                    reject(err)
                } else {
                    console.log('Success', res)
                    resolve(res.Location)

                }
            })
        })

    } catch (err) {
        console.log(err)
    }
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')

exports.uploadFiles=(req,res)=>{
    try{

        const data=req.body

        console.log('FILE UPLOAD DATA>>>',data)

        res.status(200).json({success:true})
        

    }catch(err){
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}