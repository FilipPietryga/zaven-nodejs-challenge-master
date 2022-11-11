'use strict';

class PostSimpleModel {

  /**
   * @param {DB.Post} postEntity - user entity
   */
  constructor(postEntity) {
    this.id = postEntity.id.toString();
    this.title = postEntity.title.toString();
  }
}

module.exports = PostSimpleModel;
