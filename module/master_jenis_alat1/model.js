const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');


const master_jenis_alat1 = sq.define('master_jenis_alat1', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_jenis_alat1:{
        type:DataTypes.STRING
    }
},
    {
        paranoid: true,
        freezeTableName: true
    });


module.exports = master_jenis_alat1