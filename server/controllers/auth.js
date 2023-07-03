const bcrypt = require('bcrypt')
const { randomUUID } = require('crypto')
const Users = require('../models/user')

exports.postSignup = async (req, res) => {
    try {
        const { name, email, password, phoneNo } = req.body
        if (name == undefined || name.length === 0 || email == undefined || email.length === 0 || password == undefined || password.length === 0 || phoneNo == undefined || phoneNo.length === 0) {
            return res.status(500).json({ err: 'Something is missing!' })
        }

        const saltRound = 10
        bcrypt.hash(password, saltRound, async (err, hash) => {
            if (err) {
                return res.status(500).json({ err: 'Something went wrong!' })

            }
            const user = await Users.findOne({ where: { email: email } })
            if (user) {
                return res.status(403).json({ err: 'User already exist!' })

            }
            const data = await Users.create({
                id: randomUUID(),
                name: name,
                email: email,
                password: hash,
                phoneNo: phoneNo
            })
            res.status(200).json({ success: true, user: 'Successfully created user!' })

        })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

exports.postLogin = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
}