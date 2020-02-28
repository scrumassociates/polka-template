module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define('User', {
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

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
  };

  return User;

};
