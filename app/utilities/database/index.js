'use strict';
const FS = require('fs');

class Database {

  constructor(connector) {
    /** @type {Sequelize} */
    this.connector = connector;

    /** @type {Object.<string, Sequelize.Model>} */
    this.models = null;
  }

  /**
   * Create connection for database
   * @return {Promise} - promise after connection
   * @throws
   */
  async connect() {
    let constructorName = this.connector.constructor ? this.connector.constructor.name : null;

    if (constructorName === 'Sequelize') {
      return this.connector.authenticate();
    } else {
      throw new Error('Unknown connector type.');
    }
  }

  /**
   * Import database models
   * @param {string} directoryPath - path to models directory
   * @return {Promise<Array>} - promise with imported models
   */
  async importModels(directoryPath) {
    let self = this;

    return new Promise((resolve, reject) => {
      FS.readdir(directoryPath.toString(), function (err, files) {
        if (err) {
          return reject(err);
        }

        let modelNames = self._importModels(directoryPath, files);

        resolve(modelNames);
      });
    });
  }

  /**
   * Import models synchronous
   * @param {string} directoryPath - directory path
   * @return {Array<string>} model names
   */
  importModelsSync(directoryPath) {
    let files = FS.readdirSync(directoryPath.toString());

    return this._importModels(directoryPath, files);
  }

  /**
   * @param {string} directoryPath - directory path
   * @param {Array<string>} files files
   * @return {Array<string>} model names
   * @private
   */
  _importModels(directoryPath, files) {
    let modelNames = [];
    let models = {};

    files
      .filter(file => {
        return file.indexOf('.js') >= 0 && file.indexOf('.') !== 0;
      })
      .forEach(file => {
        let model = this.connector.import(directoryPath + file);

        models[model.name] = model;
        modelNames.push(model.name);
      });

    Object.keys(models).forEach(function (modelName) {
      if ('associate' in models[modelName] && typeof models[modelName].associate === 'function') {
        models[modelName].associate(models);
      }
    });

    this.models = models;
    return modelNames;
  }
}

module.exports = Database;
