'use strict';

/**
 * @template T
 * @constructor
 * @param {null|object} error error object
 * @param {number} error.statusCode status code
 * @param {number} error.errorCode internal error code
 * @param {string} error.developerMessage internal error code
 * @param {T} [data] service result data
 */
function ServiceResult(error, data) {
  this.error = error;
  this.data = data;
  this.isSuccess = !error;
}

/** @type {T} */
ServiceResult.prototype.data = null;

module.exports = ServiceResult;
