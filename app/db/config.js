require('dotenv').config();

module.exports = {
  username: process.env.DB_USER || 'express_user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'express_db',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: true
};
