const sequelize = require('../utils/db')
const Sequelize = require('sequelize')

const Room = sequelize.define('room', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    roomname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    roomicon: {
        type: Sequelize.STRING,
        allowNull: false,
    },

})

module.exports = Room