const bcrypt = require('bcrypt')
const { randomUUID } = require('crypto')
const jwt = require('jsonwebtoken')
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

const generateToken = (id, email) => {
    return jwt.sign({ userId: id, userEmail: email }, process.env.TOKEN_SECRET)

}
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ where: { email: email } })

        if (user && password != null) {
            const userPassword = user.password
            const userEmail = user.email
            const userId = user.id
            const userName = user.name

            bcrypt.compare(password, userPassword, (err, result) => {
                if (err) {
                    throw new Error(err)
                }
                if (user && result == true) {
                    const data = {
                        userId,
                        userEmail,
                        userName
                    }
                    return res.status(200).json({ token: generateToken(userId, userEmail), data })

                } else {
                    return res.status(401).json('Password donot match!')

                }
            })

        } else {
            return res.status(404).json('User not found!')

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err })

    }
}

