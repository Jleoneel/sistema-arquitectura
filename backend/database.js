// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sist-arq', 'postgres', '2003', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false, // puedes poner 'console.log' si deseas ver las consultas SQL
});

module.exports = sequelize;