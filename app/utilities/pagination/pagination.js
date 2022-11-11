'use strict';

class Pagination {

  /**
   * @param {*} query - request query from express js
   * @param {number} defaultPage - default page
   * @param {number|null} defaultLimit - default limit
   * @param {number} maxLimit - max limit
   * @constructor
   */
  constructor(query, defaultPage, defaultLimit, maxLimit) {
    this.page = 1;
    this.maxLimit = maxLimit;
    this.pageSize = Pagination._fixLimit(query.pageSize, defaultLimit, maxLimit);
    this.page = Pagination._fixPage(query.page, defaultPage);
    this.offset = Pagination._calculateOffset(this.page, this.pageSize);
  }


  /**
   * Fix page from user query
   * @param {string|number} queryPage - requested page
   * @param {number} defaultPage - default page
   * @returns {Number|number} - fixed page
   * @private
   */
  static _fixPage(queryPage, defaultPage) {
    let page = parseInt(queryPage, 10);

    return (!page || page < 1) ? defaultPage : page;
  }


  /**
   * Fix limit form user query
   * @param {string|number} queryLimit - requested limit
   * @param {number} defaultLimit - default limit
   * @param {number} maxLimit - max limit
   * @returns {number} - fixed limit
   * @private
   */
  static _fixLimit(queryLimit, defaultLimit, maxLimit) {
    let limit = parseInt(queryLimit, 10);

    if (!limit || limit < 1) {
      return defaultLimit;
    }

    if (limit > maxLimit) {
      return maxLimit;
    }

    return limit;
  }


  /**
   * Calculate offset for pagination
   * @param {number} page - page number
   * @param {number} limit - limit count
   * @returns {number} - calculated offset
   * @private
   */
  static _calculateOffset(page, limit) {
    return (page - 1) * limit;
  }
}

module.exports = Pagination;
