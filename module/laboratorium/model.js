const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const jenis_lab= require('../jenis_lab/model')
const pool_kampus_fakultas=require('../pool_kampus_fakultas/model')

const laboratorium = sq.define('laboratorium', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

laboratorium.belongsTo(jenis_lab,{foreignKey:"jenis_lab_id"})
jenis_lab.hasMany(laboratorium,{foreignKey:"jenis_lab_id"})

laboratorium.belongsTo(pool_kampus_fakultas,{foreignKey:"pool_kampus_fakultas_id"})
pool_kampus_fakultas.hasMany(laboratorium,{foreignKey:"pool_kampus_fakultas_id"})

module.exports = laboratorium