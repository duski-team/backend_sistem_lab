const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const laboratorium = require('../laboratorium/model')
const jenis_lab=require('../jenis_lab/model')

const booking = sq.define('booking', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },

},
    {
        paranoid: true,
        freezeTableName: true
    });

booking.belongsTo(laboratorium,{foreignKey:"laboratorium_id"})
laboratorium.hasMany(booking,{foreignKey:"laboratorium_id"})

module.exports = booking