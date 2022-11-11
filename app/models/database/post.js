'use strict';

module.exports = function (sequelize, DataTypes) {

  /**
   * @memberOf DB
   */
  let Post = sequelize.define('Post', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: DataTypes.TEXT,
    authorId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });

  Post.associate = function (DB) {
    Post.belongsTo(DB.User, {foreignKey: 'authorId', as: 'Author'});
  };

  /**
   * Create a new post
   * @param {object} model - model
   * @param {string} model.title - post title
   * @param {string} model.content - post content
   * @param {string} model.authorId - post author id (uuid of user)
   * @return {DB.Post} - created post
   */
  Post.createPost = async function (model) {
    return Post.create({
      title: model.title,
      content: model.content,
      authorId: model.authorId
    });
  };

  /**
   * Get paginated posts list
   * @param {number} offset - offset
   * @param {number} limit - limit
   * @return {Promise<Array<DB.Post>>} - list of posts
   */
  Post.getPostsList = async function (offset, limit) {
    return Post.findAll({offset, limit});
  };

  /**
   * @param {string} id - post id (uuid)
   * @return {Promise<DB.Post|null>} - post
   */
  Post.findById = async function (id) {
    return Post.findOne({id});
  };

  return Post;
};
