'use strict';
const {param} = require('express-validator/check');

class GetSinglePostDTO {

  /**
   * @param {object} requestParams - request body
   * @param {string} requestParams.postId - post id (uuid)
   */
  constructor(requestParams) {
    this.postId = requestParams.postId;
  }

  /**
   * Validate method
   * @return {[ValidationChainBuilder]}
   */
  static validate() {
    return [
      param('postId', 'postId is required and it must be an uuid v4').isUUID(4)
    ];
  }
}

module.exports = GetSinglePostDTO;
