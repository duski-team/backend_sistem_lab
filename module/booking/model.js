const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');
const laboratorium = require('../laboratorium/model')
const jenis_lab=require('../jenis_lab/model')

const booking = sq.define('booking', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    booking_peminjam_mahasiswa:{
        type:DataTypes.STRING
    },
    booking_peminjam_tendik:{
        type:DataTypes.STRING
    },
    booking_peminjam_eksternal:{
        type:DataTypes.STRING
    },
    booking_in:{
        type:DataTypes.DATE
    },
    booking_out:{
        type:DataTypes.DATE
    },
    accepted:{
        type:DataTypes.SMALLINT
    }

},
    {
        paranoid: true,
        freezeTableName: true
    });

booking.belongsTo(laboratorium,{foreignKey:"laboratorium_id"})
laboratorium.hasMany(booking,{foreignKey:"laboratorium_id"})

// booking.belongsTo(jenis_lab,{foreignKey:"jenis_lab_id"})
// jenis_lab.hasMany(booking,{foreignKey:"jenis_lab_id"})

module.exports = booking