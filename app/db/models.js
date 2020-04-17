const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('./config');
const models = {};

let sequelize = {};

sequelize = new Sequelize(config.database,  config.username, config.password, config);

fs
  .readdirSync(`${__dirname}/models`)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(`${__dirname}/models`, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});


models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
