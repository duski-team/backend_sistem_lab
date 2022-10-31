const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const master_merk = sq.define('master_merk', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_merk: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = master_merk