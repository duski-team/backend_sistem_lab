const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const laboratorium = require('../laboratorium/model');
const jenis_lab= require('../jenis_lab/model')

const jenis_bahan = sq.define('jenis_bahan', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_jenis_bahan:{
        type:DataTypes.STRING
    }

},
    {
        paranoid: true,
        freezeTableName: true
    });

jenis_bahan.belongsTo(laboratorium,{foreignKey:"laboratorium_id"})
laboratorium.hasMany(jenis_bahan,{foreignKey:"laboratorium_id"})

jenis_bahan.belongsTo(jenis_lab,{foreignKey:"jenis_lab_id"})
jenis_lab.hasMany(jenis_bahan,{foreignKey:"jenis_lab_id"})

module.exports = jenis_bahan