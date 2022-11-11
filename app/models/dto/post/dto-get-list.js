'use strict';
const {query} = require('express-validator/check');

class GetPostsListDTO {

  /**
   * @param {object} requestQuery - request body
   * @param {number} requestQuery.page - page number
   * @param {number} requestQuery.pageSize - page size
   */
  constructor(requestQuery) {
    this.page = requestQuery.page;
    this.pageSize = requestQuery.pageSize;
  }

  /**
   * Validate method
   * @return {[ValidationChainBuilder]}
   */
  static validate() {
    return [
      query('page', 'page property is optional and it must be a number').optional(),
      query('pageSize', 'pageSize property is optional and it must be a number').optional()
    ];
  }
}

module.exports = GetPostsListDTO;
