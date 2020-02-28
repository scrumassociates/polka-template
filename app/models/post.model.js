module.exports = (sequelize, Sequelize) => {

  const post = sequelize.define('post', {
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

  post.associate = function (models) {
    // associations can be defined here
    post.hasMany(models.comment, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
    post.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE',
    })
  };

  return post;

};