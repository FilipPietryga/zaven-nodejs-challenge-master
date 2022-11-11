'use strict';
const Sequelize = require('sequelize');

const EnvironmentVariables = require('./app/config/environment-variables');
const Server = require('./app/utilities/server');
const Database = require('./app/utilities/database');
const DatabaseConfig = require('./app/config/database');
const Umzug = require('umzug');

const server = async () => {
  try {
    EnvironmentVariables.validateEnvironmentVariables();
  } catch (error) {
    console.error('You have to set environment variables!');
    return;
  }

  let application = require('./app/app.js');
  let sequelize = new Sequelize(EnvironmentVariables.DB_CONNECTION_STRING, DatabaseConfig);
  let database = new Database(sequelize);
  let umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        Sequelize
      ],
      path: './migrations',
      pattern: /\.js$/
    }
  });

  try {
    console.log('Connecting to database...');
    await database.connect();
    console.log('Connected!');

    console.log('Pending migrations...');
    await umzug.up();
    console.log('Migrations complete!');

    console.log('Importing database model(s)...');
    await database.importModels(__dirname + '/app/models/database/');

    global.DB = database.models;
    global.DB.sequelize = sequelize;
    global.DB.Sequelize = Sequelize;
    console.log('Imported database model(s).');
  } catch (error) {
    console.error(error);
  }

  let server = await Server(application, EnvironmentVariables.PORT);

  console.log('Application is running on port: ' + server.port);
  console.log('Please visit http://localhost:' + server.port + '/');

  return server;
};

module.exports = server();
