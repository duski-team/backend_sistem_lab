const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const kategori_barang= require('../kategori_barang/model')

const master_barang = sq.define('master_barang', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_barang: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

master_barang.belongsTo(kategori_barang,{foreignKey:"kategori_barang_id"})
kategori_barang.hasMany(master_barang,{foreignKey:"kategori_barang_id"})

module.exports = master_barang