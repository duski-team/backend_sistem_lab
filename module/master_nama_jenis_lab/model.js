const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const master_nama_jenis_lab = sq.define('master_nama_jenis_lab', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_jenis_lab:{
        type:DataTypes.STRING
    }

},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = master_nama_jenis_lab