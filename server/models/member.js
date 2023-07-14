const sequelize = require('../utils/db')
const Sequelize = require('sequelize')

const Member = sequelize.define('member', {
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
    },
    photoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }

})

module.exports = Member