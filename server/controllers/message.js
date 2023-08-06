const Messages = require('../models/message')
const { randomUUID } = require('crypto')
const AWS = require('aws-sdk')
const { encryptData, decryptData } = require('../encryption')

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
            roomId: data.roomId,
            files: data.files
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

        const updatedData = messages.map((msg) => {
            if (msg.files !== '') {
                msg.files = decryptData(msg.files);
            }
            return msg;
        });
        res.status(200).json({ success: true, messages: updatedData })

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


exports.uploadFiles = async (req, res) => {
    try {

        const file = req.file
        const fileData = req.file?.buffer; // File data from multer
        const fileName = req.file?.originalname; // Original file name
        const userId = req.user.id
        const roomId = req.params.roomId
        const msgId = req.params.msgId
        const fname = `Uploads-${msgId}-to-${roomId}/${userId}-${fileName}`

        const fileUrl = await uploadToS3(fileData, fname)

        const encryptedFile = encryptData(fileUrl)

        const updatedMsg = await Messages.findOne({
            where: {
                id: msgId,
                roomId: roomId
            }
        })

        await updatedMsg.update({ files: encryptedFile })

        res.status(200).json({ message: 'File uploaded successfully', fileUrl });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.storeFiles = async (req, res) => {
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
            roomId: data.roomId,
            files: data.files
        })

        res.status(200).json({ success: true, messageId: message.dataValues.id })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getUploadedFiles = async (req, res) => {
    try {
        const roomId = req.params.roomId
        let s3 = new AWS.S3({
            accessKeyId: process.env.IAM_USER_ACCESSKEY,
            secretAccessKey: process.env.IAM_USER_SECRETKEY,
        })
        var params = {
            Bucket: process.env.BUCKET_NAME,
            Prefix: `Uploads${roomId}/`
        }
        const response = await s3.listObjectsV2(params).promise();

        // const filesData = response.Contents

        // console.log(filesData)
        const filesData = response.Contents.map((file) => {
            const url = s3.getSignedUrl('getObject', {
                Bucket: process.env.BUCKET_NAME,
                Key: file.Key,
            });
            return {
                key: file.Key,
                url: url,
                type: file.Key.split('.').pop(), // Get file extension
            };
        });


        res.status(200).json({ success: true, filesData });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Error fetching files from S3' });
    }
}

