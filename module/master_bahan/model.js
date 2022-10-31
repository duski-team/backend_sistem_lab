const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const master_satuan = require('../master_satuan/model')

const master_bahan = sq.define('master_bahan', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_bahan: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

master_bahan.belongsTo(master_satuan,{foreignKey:"master_satuan_id"})
master_satuan.hasMany(master_bahan,{foreignKey:"master_satuan_id"})

module.exports = master_bahan