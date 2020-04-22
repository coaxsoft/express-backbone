require('dotenv').config();
const config = {
  username: 'express_user',
  password: 'password',
  database: 'express_db',
  host: 'localhost',
  dialect: 'postgres',
  logging: false
};

if (process.env.NODE_ENV === 'test') {
  config.username = process.env.TEST_DB_USER;
  config.password = process.env.TEST_DB_PASSWORD;
  config.database = process.env.TEST_DB_NAME;
  config.host = process.env.TEST_DB_HOST;
} else {
  config.username = process.env.DB_USER;
  config.password = process.env.DB_PASSWORD;
  config.database = process.env.DB_NAME;
  config.host = process.env.DB_HOST;
}

module.exports = config;
