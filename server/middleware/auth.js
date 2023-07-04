const jwt = require('jsonwebtoken')
const Users = require('../models/user')

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        const user = jwt.verify(token, process.env.TOKEN_SECRET) //dcrypting token
        console.log('USER>>>',user)
        Users.findByPk(user.userId).then((user) => {
            req.user = user
            next()
        }).catch((err) => { throw new Error(err) })

    } catch (err) {
        console.log(err)
        return res.status(401).json({ success: false })
    }
}

module.exports = { authenticate }