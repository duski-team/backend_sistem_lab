const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const master_satuan = sq.define('master_satuan', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_satuan: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = master_satuan