const sequelize = require('../utils/db')
const Sequelize = require('sequelize')

const AllMessage = sequelize.define('message', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = AllMessage