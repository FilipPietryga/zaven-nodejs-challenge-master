'use strict';
const {body} = require('express-validator/check');

class CreateSingleUserDTO {

  /**
   * @param {object} requestBody - request body
   * @param {string} requestBody.email - user email
   * @param {string} requestBody.firstName - user first name
   * @param {string} requestBody.lastName - user last name
   * @param {string} requestBody.password - user password
   */
  constructor(requestBody) {
    this.email = requestBody.email;
    this.firstName = requestBody.firstName;
    this.lastName = requestBody.lastName;
    this.password = requestBody.password;
  }

  /**
   * Validate method
   * @return {[ValidationChainBuilder]}
   */
  static validate() {
    return [
      body('email', 'email is required and it must be an email').isEmail(),
      body('firstName', 'firstName is required and it must be a string').isLength({min: 1, max: 25}),
      body('lastName', 'lastName is required and it must be a string').isLength({min: 1, max: 25}),
      body('password', 'password is required and it must be a string with min. 8 characters').isLength({min: 8})
    ];
  }
}

module.exports = CreateSingleUserDTO;
