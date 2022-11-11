'use strict';
const {body} = require('express-validator/check');

class CreateSinglePostDTO {

  /**
   * @param {object} requestBody - request body
   * @param {string} requestBody.title - title (only text)
   * @param {string} requestBody.content - content (html is allowed)
   * @param {string} requestBody.authorId - user id
   */
  constructor(requestBody) {
    this.title = requestBody.title;
    this.content = requestBody.content;
    this.authorId = requestBody.authorId;
  }

  /**
   * Validate method
   * @return {[ValidationChainBuilder]}
   */
  static validate() {
    return [
      body('title', 'title is required and it must be a string').isLength({min: 1, max: 255}),
      body('content', 'content is required and it must be a string').isLength({min: 1}),
      body('authorId', 'authorId is required and it must be an UUID').isUUID({version: 4})
    ];
  }
}

module.exports = CreateSinglePostDTO;
