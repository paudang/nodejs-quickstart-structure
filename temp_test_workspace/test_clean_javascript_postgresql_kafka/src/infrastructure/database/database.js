const { Sequelize } = require('sequelize');
require('dotenv').config();

// Determine dialect

const dialect = 'postgres';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'testdb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: dialect,
    logging: false,
    port: parseInt(process.env.DB_PORT || '5432')
  }
);

module.exports = sequelize;
