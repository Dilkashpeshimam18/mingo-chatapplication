const sequelize = require('../utils/db')
const Sequelize = require('sequelize')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User