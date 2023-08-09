const Member = require('../models/member')
const { randomUUID } = require('crypto')
const User = require("../models/user")
const { Op } = require('sequelize');

exports.addMember = async (req, res) => {
    try {
        const data = req.body
        const roomId = req.params.roomid
        const member = await Member.create({
            id: randomUUID(),
            name: data.name,
            email: data.email,
            photoUrl: data.photoUrl,
            isAdmin: data.isAdmin,
            roomId: roomId,
            userId: data.id
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

exports.getAddMember = async (req, res) => {
    try {
        const roomId = req.params.roomId
        const member = await Member.findAll({
            where: {
                roomId: roomId
            }
        });

        const userIds = member.map((mem) => mem.dataValues.userId);

        const usersNotInMembers = await User.findAll({
            where: {
                id: {
                    [Op.notIn]: userIds
                }
            }
        });

        res.status(200).json({ success: true, user: usersNotInMembers })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })
 }
}