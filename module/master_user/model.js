const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const masterUser = sq.define('master_user_lab', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    identity_lab: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    level: {
        type: DataTypes.INTEGER // 99: superUser
    },
    prodi_id:{
        type:DataTypes.STRING
    }
},
    {
        paranoid: true,
        freezeTableName: true
    });

    
module.exports = masterUser