const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const prodi = require('../prodi/model');

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
    }
},
    {
        paranoid: true,
        freezeTableName: true
    });

    masterUser.belongsTo(prodi,{foreignKey:'prodi_id'});
    prodi.hasMany(masterUser,{foreignKey:'prodi_id'});
    
module.exports = masterUser