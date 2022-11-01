const { DataTypes } = require('sequelize');
const {sq} = require('../../config/connection');

const master_jenis_lab = sq.define('master_jenis_lab', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },

},
    {
        paranoid: true,
        freezeTableName: true
    });

module.exports = master_jenis_lab