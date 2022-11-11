'use strict';

module.exports = function (sequelize, DataTypes) {

  /**
   * @memberOf DB
   */
  let User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    passwordHash: DataTypes.TEXT
  });

  User.associate = function (DB) {
    User.hasMany(DB.Post, {foreignKey: 'authorId', as: 'Posts'});
  };

  return User;
};
