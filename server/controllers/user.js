const User = require("../models/user")
const { Op } = require('sequelize');

exports.editUserProfile = async (req, res) => {
    try {
        const { name, email, bio, photoUrl } = req.body
        const user = req.user

        await user.update({ name, email, bio, photoUrl })

        res.status(200).json({ success: true, user: 'Successfully updated user!' })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'User update unsuccessful!' })

    }
}

exports.getAllUser = async (req, res) => {
    try {
        const userId = req.user.id
        const allUser = await User.findAll({where:{
            id:{
                [Op.ne]:userId
            }
        }})
        res.status(200).json({ success: true, allUser })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}