'use strict';
const ServiceResult = require('../models/service-results/service-results');
const UsersErrors = require('../constants/errors/user-errors');
const Pagination = require('../utilities/pagination/pagination');

class UsersService {
  /**
   * Create new user service method
   * @param {CreateSingleUserDTO} createUserDTO - create user dto
   * @return {Promise<ServiceResult<DB.User>>} - service result
   */
  async createUser(createUserDTO) {
    // todo: Implement create user service method. It should adds user to database.
    // todo: Look at createUserDTO properties for user input
    try {
      let user = await DB.User.create({
        email: createUserDTO.email,
        firstName: createUserDTO.firstName,
        lastName: createUserDTO.lastName,
        password: createUserDTO.password
      });

      return new ServiceResult(null, user);
    } catch (error) {
      console.error(error);
      return new ServiceResult(UsersErrors.UNEXPECTED_ERROR);
    }
  }

  /**
   * Get users list service method
   * @param {GetUsersListDTO} getUsersListDTO - get users list dto
   * @return {Promise<ServiceResult<Array<DB.User>>>} - service result
   */
  async getUsersList(getUsersListDTO) {
    // todo: Implement get users list service method. It should gets users list from database.
    // todo: Look at getUsersListDTO properties for user input
    try {
      let pagination = new Pagination(getUsersListDTO, 1, 10, 100);
      let users = await (async function (offset, limit) {
        return DB.User.findAll({offset, limit});
      })(pagination.offset, pagination.pageSize);

      return new ServiceResult(null, users);
    } catch (error) {
      console.error(error);
      return new ServiceResult(UsersErrors.UNEXPECTED_ERROR);
    }
  }

  /**
   * Get single user service method
   * @param {GetSingleUserDTO} getSingleUserDTO - get single user dto
   * @return {Promise<ServiceResult<DB.User>>} - service result
   */
  async getSingleUser(GetSingleUserDTO) {
    // todo: Implement get single user service method. It should gets single user (by id) from database.
    // todo: Look at getSingleUserDTO properties for user input
    try {
      let user = await (async function (id) {
        return DB.User.findOne({id});
      })(GetSingleUserDTO.userId);
      
      if (!user) {
        return new ServiceResult(UsersErrors.NOT_FOUND);
      }

      return new ServiceResult(null, user);
    } catch (error) {
      console.error(error);
      return new ServiceResult(UsersErrors.UNEXPECTED_ERROR);
    }
  }
}

module.exports = UsersService;
