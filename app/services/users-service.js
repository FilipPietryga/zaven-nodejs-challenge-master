'use strict';
const ServiceResult = require('../models/service-results/service-results');
const UsersErrors = require('../constants/errors/user-errors');

class UsersService {
  /**
   * Create new user service method
   * @param {CreateSingleUserDTO} createUserDTO - create user dto
   * @return {Promise<ServiceResult<DB.User>>} - service result
   */
  async createUser(createUserDTO) {
    // todo: Implement create user service method. It should adds user to database.
    // todo: Look at createUserDTO properties for user input

    return new ServiceResult(UsersErrors.NOT_IMPLEMENTED);
  }

  /**
   * Get users list service method
   * @param {GetUsersListDTO} getUsersListDTO - get users list dto
   * @return {Promise<ServiceResult<Array<DB.User>>>} - service result
   */
  async getUsersList(getUsersListDTO) {
    // todo: Implement get users list service method. It should gets users list from database.
    // todo: Look at getUsersListDTO properties for user input

    return new ServiceResult(UsersErrors.NOT_IMPLEMENTED);
  }

  /**
   * Get single user service method
   * @param {GetSingleUserDTO} getSingleUserDTO - get single user dto
   * @return {Promise<ServiceResult<DB.User>>} - service result
   */
  async getSingleUser(getSingleUserDTO) {
    // todo: Implement get single user service method. It should gets single user (by id) from database.
    // todo: Look at getSingleUserDTO properties for user input

    return new ServiceResult(UsersErrors.NOT_IMPLEMENTED);
  }
}

module.exports = UsersService;
