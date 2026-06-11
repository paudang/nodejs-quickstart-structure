import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dialect = 'postgres';
const sequelize = new Sequelize(
  process.env.DB_NAME || 'demo',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: dialect,
    logging: false,
    port: parseInt(process.env.DB_PORT || '5432')
  }
);

export default sequelize;
