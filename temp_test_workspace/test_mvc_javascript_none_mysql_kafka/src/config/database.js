const { Sequelize } = require('sequelize');
require('dotenv').config();

// Determine dialect
const dialect = 'mysql';


const sequelize = new Sequelize(
  process.env.DB_NAME || 'testdb',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: dialect,
    logging: false,
    port: parseInt(process.env.DB_PORT || '3306')
  }
);

module.exports = sequelize;
