const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const kategori_barang = sq.define('kategori_barang', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_kategori_barang: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = kategori_barang