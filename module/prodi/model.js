const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const prodi = sq.define('prodi', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_prodi: {
        type: DataTypes.STRING
    },
    kode_prodi: {
        type: DataTypes.STRING
    }
},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = prodi