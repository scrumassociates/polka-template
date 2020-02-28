module.exports = (sequelize, Sequelize) => {

  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    postId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    comment: Sequelize.TEXT
  }, {});

  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post'
    });
  };

  return Comment;

};