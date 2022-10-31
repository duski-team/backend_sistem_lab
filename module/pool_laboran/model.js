const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const laboratorium=require('../laboratorium/model')

const pool_laboran = sq.define('pool_laboran', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    laboran_id: {
        type: DataTypes.STRING  //dari simpeg
    },
},
    {
        paranoid: true,
        freezeTableName: true
    });
pool_laboran.belongsTo(laboratorium,{foreignKey:"laboratorium_id"})
laboratorium.hasMany(pool_laboran,{foreignKey:"laboratorium_id"})


module.exports = pool_laboran