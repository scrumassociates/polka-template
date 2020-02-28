module.exports = (sequelize, Sequelize) => {

  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    userId: Sequelize.UUID
  }, {});

  Post.associate = function (models) {
    // associations can be defined here
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE',
    })
  };

  return Post;

};