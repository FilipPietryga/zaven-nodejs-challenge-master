'use strict';
const UserSimpleModel = require('./user-simple-model');

class UserModel extends UserSimpleModel {

  /**
   * @param {DB.User} userEntity - user entity
   */
  constructor(userEntity) {
    super(userEntity);

    this.email = userEntity.email.toString();
  }
}

module.exports = UserModel;
