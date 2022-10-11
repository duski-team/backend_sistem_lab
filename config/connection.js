require('dotenv').config({})

const { Sequelize } = require('sequelize');

const sq = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIAL,
    logging:false,
    dialectOptions:{
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 1000,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    },
    timezone: '+07:00'
  });

  const simadu = new Sequelize(process.env.DB_NAME_SIMADU,process.env.DB_USER_SIMADU,process.env.DB_PASS_SIMADU, {
    host: process.env.DB_HOST_SIMADU,
    port: process.env.DB_PORT_SIMADU,
    dialect: process.env.DB_DIAL_SIMADU,
    logging:false,
    dialectOptions:{
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 1000,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    },
    timezone: '+07:00'
  });

  const simpeg = new Sequelize(process.env.DB_NAME_SIMPEG,process.env.DB_USER_SIMPEG,process.env.DB_PASS_SIMPEG, {
    host: process.env.DB_HOST_SIMPEG,
    port: process.env.DB_PORT_SIMPEG,
    dialect: process.env.DB_DIAL_SIMPEG,
    logging:false,
    dialectOptions:{
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 1000,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    },
    timezone: '+07:00'
  });

  const all = new Sequelize(process.env.DB_NAME_ALL,process.env.DB_USER_ALL,process.env.DB_PASS_ALL, {
    host: process.env.DB_HOST_ALL,
    port: process.env.DB_PORT_ALL,
    dialect: process.env.DB_DIAL_ALL,
    logging:false,
    dialectOptions:{
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 1000,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    },
    timezone: '+07:00'
  });


// const sso = new Sequelize(process.env.DB_NAME_SSO,process.env.DB_USER,process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: process.env.DB_DIAL,
//     logging:false,
//     dialectOptions:{
//       dateStrings: true,
//       typeCast: true,
//     },
//     pool: {
//       max: 1000,
//       min: 0,
//       idle: 200000,
//       acquire: 1000000,
//     },
//     timezone: '+07:00'
//   });


//   const sia = new Sequelize(process.env.DATABASE_SIA,process.env.USER_DB_SIA,process.env.PASS_DB_SIA, {
//     host: process.env.IP_DB_SIA,
//     port: process.env.PORT_DB_SIA,
//     dialect: 'mysql',
//     logging:false,
//     dialectOptions:{
//       dateStrings: true,
//       typeCast: true,
//     },
//     pool: {
//       max: 1000,
//       min: 0,
//       idle: 200000,
//       acquire: 1000000,
//     },
//     timezone: '+07:00'
//   });

  

module.exports = {sq,simadu,all,simpeg}