const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const tipe_barang = sq.define('tipe_barang', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_tipe_barang: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = tipe_barang