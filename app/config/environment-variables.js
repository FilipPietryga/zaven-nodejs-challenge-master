'use strict';

const Defaults = require('./defaults');
const EnvironmentVariables = {};

EnvironmentVariables.NODE_ENV = process.env.NODE_ENV || Defaults.NODE_ENV;
EnvironmentVariables.PORT = process.env.PORT || Defaults.PORT;
EnvironmentVariables.DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || null;

EnvironmentVariables.validateEnvironmentVariables = function () {
  let key, value, errorsCount = 0;

  for (key in EnvironmentVariables) {
    if (EnvironmentVariables.hasOwnProperty(key)) {
      value = EnvironmentVariables[key];

      if (value === null || typeof (value) === 'undefined') {
        console.error('Environment variable `' + key + '` is set as null!');
        errorsCount++;
      }
    }
  }

  if (errorsCount) {
    throw new Error('You have set all environment variables!');
  }
};

module.exports = EnvironmentVariables;
