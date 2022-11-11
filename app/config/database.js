'use strict';
let EnvironmentVariables = require('../config/environment-variables');

module.exports = {
  logging: function (str) {
    if (EnvironmentVariables.NODE_ENV !== 'production' && EnvironmentVariables.NODE_ENV !== 'test') {
      console.log(str);
    }
  },
  dialectOptions: {
    encrypt: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000,
    evict: 20000,
    handleDisconnects: true
  }
};
