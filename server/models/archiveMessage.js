const sequelize = require('../utils/db')
const Sequelize = require('sequelize')

const ArchivedMessage = sequelize.define('archivedmessage', {
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
    },
    files:{
        type:Sequelize.STRING(1000) 
    }
})

module.exports = ArchivedMessage