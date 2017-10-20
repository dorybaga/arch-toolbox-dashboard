const sequelize = require('sequelize');
const Projects = require('./Projects');
const Pins = require('./Pins');




module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstName: { type: DataTypes.TEXT, allowNull: false },
    lastName: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.TEXT, allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: false },
    user_role: { type: DataTypes.TEXT, allowNull: false }
  });

   Users.associate = function(models) {

    Users.belongsToMany(models.Projects,
      {
        as: 'Users',
        through: 'users_projects',
        foreignKey: 'user_id'
      });
    };

  return Users;
};