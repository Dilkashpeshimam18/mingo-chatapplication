const User = require("../models/user")
const { Op } = require('sequelize');
const Member = require('../models/member')
const Messages = require('../models/message')

exports.editUserProfile = async (req, res) => {
    try {
        const { name, email, bio, photoUrl } = req.body
        const user = req.user
        const userId = user.id

        await user.update({ name, email, bio, photoUrl })

        const members = await Member.findAll({
            where: {
                userId: userId
            }
        })

        for (const member of members) {
            await member.update({ name, email, photoUrl });
        }
        const messages = await Messages.findAll({
            where: {
                userId: userId
            }
        })
        for (const msg of messages) {
            await msg.update({ username: name, email, photoUrl });
        }
        res.status(200).json({ success: true, user: 'Successfully updated user!' })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'User update unsuccessful!' })

    }
}

exports.getAllUser = async (req, res) => {
    try {
        const userId = req.user.id
        const allUser = await User.findAll({
            where: {
                id: {
                    [Op.ne]: userId
                }
            }
        })
        res.status(200).json({ success: true, allUser })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.getUser = (req, res) => {
    try {
        const user = req.user
        const data = {
            bio: user.bio,
            photoUrl: user.photoUrl,
            email: user.email,
            name: user.name
        }

        res.status(200).json({ success: true, user: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })
    }
}