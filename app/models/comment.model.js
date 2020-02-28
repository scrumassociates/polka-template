module.exports = (sequelize, Sequelize) => {

  const comment = sequelize.define('comment', {
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

  comment.associate = function (models) {
    // associations can be defined here
    comment.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'author'
    });
    comment.belongsTo(models.post, {
      foreignKey: 'postId',
      as: 'post'
    });
  };

  return comment;

};