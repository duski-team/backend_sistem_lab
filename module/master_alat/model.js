const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const master_jenis_alat2=require('../master_jenis_alat2/model')
const master_merk=require('../master_merk/model')

const master_alat = sq.define('master_alat', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_alat: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

master_alat.belongsTo(master_jenis_alat2,{foreignKey:"jenis_alat2_id"})
master_jenis_alat2.hasMany(master_alat,{foreignKey:"jenis_alat2_id"})

master_alat.belongsTo(master_merk,{foreignKey:"master_merk_id"})
master_merk.hasMany(master_alat,{foreignKey:"master_merk_id"})

module.exports = master_alat