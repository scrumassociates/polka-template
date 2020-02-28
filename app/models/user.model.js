module.exports = (sequelize, Sequelize) => {

  const user = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    passwordHash: {
      allowNull: false,
      type: Sequelize.STRING
    }
  }, {});

  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.post, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE',
    });
    user.hasMany(models.comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
  };

  return user;

};
