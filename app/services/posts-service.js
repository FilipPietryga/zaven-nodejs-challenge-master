'use strict';
const ServiceResult = require('../models/service-results/service-results');
const PostErrors = require('../constants/errors/post-errors');
const Pagination = require('../utilities/pagination/pagination');

class PostsService {
  /**
   * Create new post service method
   * @param {CreateSinglePostDTO} createPostDTO - create post dto
   * @return {Promise<ServiceResult<DB.Post>>} - service result
   */
  async createPost(createPostDTO) {
    try {
      let post = await DB.Post.createPost({
        title: createPostDTO.title,
        content: createPostDTO.content,
        authorId: createPostDTO.authorId
      });

      return new ServiceResult(null, post);
    } catch (error) {
      console.error(error);
      return new ServiceResult(PostErrors.UNEXPECTED_ERROR);
    }
  }

  /**
   * Get posts list service method
   * @param {GetPostsListDTO} getPostsListDTO - get posts list dto
   * @return {Promise<ServiceResult<Array<DB.Post>>>} - service result
   */
  async getPostsList(getPostsListDTO) {
    try {
      let pagination = new Pagination(getPostsListDTO, 1, 10, 100);
      let posts = await DB.Post.getPostsList(pagination.offset, pagination.pageSize);

      return new ServiceResult(null, posts);
    } catch (error) {
      console.error(error);
      return new ServiceResult(PostErrors.UNEXPECTED_ERROR);
    }
  }

  /**
   * Get single post service method
   * @param {GetSinglePostDTO} getSinglePostDTO - get single post dto
   * @return {Promise<ServiceResult<DB.Post>>} - service result
   */
  async getSinglePost(getSinglePostDTO) {
    try {
      let post = await DB.Post.findById(getSinglePostDTO.postId);

      if (!post) {
        return new ServiceResult(PostErrors.NOT_FOUND);
      }

      return new ServiceResult(null, post);
    } catch (error) {
      console.error(error);
      return new ServiceResult(PostErrors.UNEXPECTED_ERROR);
    }
  }
}

module.exports = PostsService;
