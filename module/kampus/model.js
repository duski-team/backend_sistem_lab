const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const kampus = sq.define('kampus', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    wilayah_id: {
        type: DataTypes.STRING
    },
    alamat_kampus:{
        type:DataTypes.STRING
    },
    nama_kampus:{
        type:DataTypes.STRING
    },
    gmaps_kampus:{
        type:DataTypes.STRING
    }
},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = kampus