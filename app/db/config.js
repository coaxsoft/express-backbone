require('dotenv').config();

module.exports = {
  "local": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.TEST_DB_USER,
    "password": process.env.TEST_DB_PASSWORD,
    "database": process.env.TEST_DB_NAME,
    "host": process.env.TEST_DB_HOST,
    "logging": false,
    "dialect": "postgres",
    pool: {
      // Set maxIdleTime to 10 seconds. Otherwise, it kills transactions that
      // are open for long.
      maxIdleTime: 10000,
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
};
