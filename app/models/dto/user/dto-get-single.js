'use strict';
const {param} = require('express-validator/check');

class GetSingleUserDTO {

  /**
   * @param {object} requestParams - request body
   * @param {string} requestParams.userId - user id (uuid)
   */
  constructor(requestParams) {
    this.userId = requestParams.userId;
  }

  /**
   * Validate method
   * @return {[ValidationChainBuilder]}
   */
  static validate() {
    return [
      param('userId', 'userId is required and it must be an uuid v4').isUUID(4)
    ];
  }
}

module.exports = GetSingleUserDTO;
