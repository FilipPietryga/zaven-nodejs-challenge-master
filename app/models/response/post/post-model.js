'use strict';
const PostSimpleModel = require('./post-simple-model');

class PostModel extends PostSimpleModel {

  /**
   * @param {DB.Post} postEntity - user entity
   */
  constructor(postEntity) {
    super(postEntity);

    this.content = postEntity.content.toString();
  }
}

module.exports = PostModel;
