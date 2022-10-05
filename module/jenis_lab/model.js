const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const jenis_lab = sq.define('jenis_lab', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fakultas_id:{
        type:DataTypes.STRING
    },
    nama_jenis_lab:{
        type:DataTypes.STRING
    }

},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = jenis_lab