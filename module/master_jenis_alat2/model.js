const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const master_jenis_alat1=require('../master_jenis_alat1/model')

const master_jenis_alat2 = sq.define('master_jenis_alat2', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_jenis_alat2:{
        type:DataTypes.STRING
    }
},
    {
        paranoid: true,
        freezeTableName: true
    });


master_jenis_alat2.belongsTo(master_jenis_alat1,{foreignKey:"jenis_alat1_id"})
master_jenis_alat1.hasMany(master_jenis_alat2,{foreignKey:"jenis_alat1_id"})

module.exports = master_jenis_alat2