const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const kampus = require('../kampus/model')

const pool_kampus_fakultas = sq.define('pool_kampus_fakultas', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fakultas_id: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

pool_kampus_fakultas.belongsTo(kampus,{foreignKey:"kampus_id"})
kampus.hasMany(pool_kampus_fakultas,{foreignKey:"kampus_id"})

module.exports = pool_kampus_fakultas