const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const laboratorium= require('../laboratorium/model')
const master_nama_jenis_lab=require('../master_nama_jenis_lab/model')

const jenis_lab = sq.define('jenis_lab', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fakultas_id:{
        type:DataTypes.STRING
    },
    kode_lab:{
        type:DataTypes.STRING
    }

},
    {
        paranoid: true,
        freezeTableName: true
    });

jenis_lab.belongsTo(laboratorium,{foreignKey:"laboratorium_id"})
laboratorium.hasMany(jenis_lab,{foreignKey:"laboratorium_id"})

jenis_lab.belongsTo(master_nama_jenis_lab,{foreignKey:"master_nama_jenis_lab_id"})
master_nama_jenis_lab.hasMany(jenis_lab,{foreignKey:"master_nama_jenis_lab_id"})

module.exports = jenis_lab