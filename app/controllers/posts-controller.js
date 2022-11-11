'use strict';
const {validationResult} = require('express-validator/check');
const PostError = require('../constants/errors/post-errors');
const PostsService = require('../services/posts-service');

const GetPostsListDTO = require('../models/dto/post/dto-get-list');
const GetSinglePostDTO = require('../models/dto/post/dto-get-single');
const CreateSinglePostDTO = require('../models/dto/post/dto-create-single');

const PostModel = require('../models/response/post/post-model');
const PostSimpleModel = require('../models/response/post/post-simple-model');

class PostsController {

  /**
   * Constructor for posts controller
   */
  constructor() {
    this.postsService = new PostsService();
  }

  /**
   * Create new post method
   * @HTTPMethod: POST
   * @HTTPAddress: /posts
   * @param {*} req - express request object
   * @param {*} res - express request response
   * @param {function} next - next method
   */
  async createPost(req, res, next) {
    let validationErrors = validationResult(req);
    let createPostDTO = new CreateSinglePostDTO(req.body);

    if (!validationErrors.isEmpty()) {
      res.sendError(PostError.CREATE_WRONG_DATA, validationErrors.mapped());
      return next();
    }

    let createPostResults = await this.postsService.createPost(createPostDTO);

    if (!createPostResults.isSuccess) {
      res.sendError(createPostResults.error);
      return next();
    }

    let postModel = new PostModel(createPostResults.data);

    res.status(201).json(postModel);
    next();
  }


  /**
   * Get posts list method
   * @HTTPMethod: GET
   * @HTTPAddress: /posts
   * @param {*} req - express request object
   * @param {*} res - express request response
   * @param {function} next - next method
   */
  async getPostsList(req, res, next) {
    let validationErrors = validationResult(req);
    let getProjectsListDTO = new GetPostsListDTO(req.query);

    if (!validationErrors.isEmpty()) {
      res.sendError(PostError.GET_POSTS_LIST_WRONG_DATA, validationErrors.mapped());
      return next();
    }

    let getPostsListResults = await this.postsService.getPostsList(getProjectsListDTO);

    if (!getPostsListResults.isSuccess) {
      res.sendError(getPostsListResults.error);
      return next();
    }

    let postsList = getPostsListResults.data.map(post => new PostSimpleModel(post));

    res.status(200).json(postsList);
    next();
  }

  /**
   * Get single post method
   * @HTTPMethod: GET
   * @HTTPAddress: /posts/:postId
   * @param {*} req - express request object
   * @param {*} res - express request response
   * @param {function} next - next method
   */
  async getSinglePost(req, res, next) {
    let validationErrors = validationResult(req);
    let ggetSinglePostDTO = new GetSinglePostDTO(req.params);

    if (!validationErrors.isEmpty()) {
      res.sendError(PostError.GET_POST_WRONG_DATA, validationErrors.mapped());
      return next();
    }

    let getSinglePostResults = await this.postsService.getSinglePost(ggetSinglePostDTO);

    if (!getSinglePostResults.isSuccess) {
      res.sendError(getSinglePostResults.error);
      return next();
    }

    let postModel = new PostModel(getSinglePostResults.data);

    res.status(200).json(postModel);
    next();
  }

  /**
   * Register routes for PostsController
   * @param {*} router - express router object
   */
  registerRoutes(router) {
    router.post('/posts', CreateSinglePostDTO.validate(), this.createPost.bind(this));
    router.get('/posts', GetPostsListDTO.validate(), this.getPostsList.bind(this));
    router.get('/posts/:postId', GetSinglePostDTO.validate(), this.getSinglePost.bind(this));
  }
}

module.exports = PostsController;
