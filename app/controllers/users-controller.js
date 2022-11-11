'use strict';
const {validationResult} = require('express-validator/check');
const UsersService = require('../services/users-service');
const UserErrors = require('../constants/errors/user-errors');

const GetUsersListDTO = require('../models/dto/user/dto-get-list');
const GetSingleUserDTO = require('../models/dto/user/dto-get-single');
const CreateSingleUserDTO = require('../models/dto/user/dto-create-single');
const UserModel = require('../models/response/user/user-model');
const UserSimpleModel = require('../models/response/user/user-simple-model');

class UsersController {

  /**
   * Constructor for user controller
   */
  constructor() {
    this.usersService = new UsersService();
  }

  /**
   * Create new user method
   * @HTTPMethod: POST
   * @HTTPAddress: /users
   * @param {*} req - express request object
   * @param {*} res - express request response
   * @param {function} next - next method
   */
  async createUser(req, res, next) {
    let validationErrors = validationResult(req);
    let createUserDTO = new CreateSingleUserDTO(req.body);

    if (!validationErrors.isEmpty()) {
      res.sendError(UserErrors.CREATE_WRONG_DATA, validationErrors.mapped());
      return next();
    }

    let createUserResults = await this.usersService.createUser(createUserDTO);

    if (!createUserResults.isSuccess) {
      res.sendError(createUserResults.error);
      return next();
    }

    let userModel = new UserModel(createUserResults.data);

    res.status(201).json(userModel);
    next();
  }

  /**
   * Get users list method
   * @HTTPMethod: GET
   * @HTTPAddress: /users
   * @param {*} req - express request object
   * @param {*} res - express request response
   * @param {function} next - next method
   */
  async getUsersList(req, res, next) {
    let validationErrors = validationResult(req);
    let getUsersListDTO = new GetUsersListDTO(req.query);

    if (!validationErrors.isEmpty()) {
      res.sendError(UserErrors.GET_USERS_LIST_WRONG_DATA, validationErrors.mapped());
      return next();
    }

    let getUsersListResults = await this.usersService.getUsersList(getUsersListDTO);

    if (!getUsersListResults.isSuccess) {
      res.sendError(getUsersListResults.error);
      return next();
    }

    let usersList = getUsersListResults.data.map(userModel => new UserSimpleModel(userModel));

    res.status(200).json(usersList);
    next();
  }

  /**
   * Get single user method
   * @HTTPMethod: GET
   * @HTTPAddress: /users/:userId
   * @param {*} req - express request object
   * @param {*} res - express request response
   * @param {function} next - next method
   */
  async getSingleUser(req, res, next) {
    let validationErrors = validationResult(req);
    let getSingleUserDTO = new GetSingleUserDTO(req.params);

    if (!validationErrors.isEmpty()) {
      res.sendError(UserErrors.GET_USER_WRONG_DATA, validationErrors.mapped());
      return next();
    }

    let getSingleUserResults = await this.usersService.getSingleUser(getSingleUserDTO);

    if (!getSingleUserResults.isSuccess) {
      res.sendError(getSingleUserResults.error);
      return next();
    }

    let userModel = new UserModel(getSingleUserResults.data);

    res.status(200).json(userModel);
    next();
  }

  /**
   * Register routes for UsersController
   * @param {*} router - express router object
   */
  registerRoutes(router) {
    router.post('/users', CreateSingleUserDTO.validate(), this.createUser.bind(this));
    router.get('/users', GetUsersListDTO.validate(), this.getUsersList.bind(this));
    router.get('/users/:userId', GetSingleUserDTO.validate(), this.getSingleUser.bind(this));
  }
}

module.exports = UsersController;
