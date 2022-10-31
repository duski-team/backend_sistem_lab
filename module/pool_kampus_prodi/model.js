const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const kampus = require('../kampus/model')

const pool_kampus_prodi = sq.define('pool_kampus_prodi', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    prodi_id: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });

pool_kampus_prodi.belongsTo(kampus,{foreignKey:"kampus_id"})
kampus.hasMany(pool_kampus_prodi,{foreignKey:"kampus_id"})

module.exports = pool_kampus_prodi