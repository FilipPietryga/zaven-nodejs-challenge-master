'use strict';

const PostErrors = {};

PostErrors.CREATE_WRONG_DATA = {
  errorCode: 2001,
  statusCode: 400,
  developerMessage: 'Create post wrong data'
};

PostErrors.GET_POSTS_LIST_WRONG_DATA = {
  errorCode: 2002,
  statusCode: 400,
  developerMessage: 'Get posts list wrong data'
};

PostErrors.GET_POST_WRONG_DATA = {
  errorCode: 2003,
  statusCode: 400,
  developerMessage: 'Get post wrong data'
};

PostErrors.NOT_FOUND = {
  errorCode: 2004,
  statusCode: 404,
  developerMessage: 'Post does not exist!'
};

PostErrors.UNEXPECTED_ERROR = {
  errorCode: 2005,
  statusCode: 500,
  developerMessage: 'Unexpected error occurred!'
};


module.exports = PostErrors;
