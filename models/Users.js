const sequelize = require('sequelize');
const User_role = require('./User_role');


module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: { type: DataTypes.TEXT, allowNull: false},
    password: { type: DataTypes.TEXT, allowNull: false}
  });

  Users.associate = function(models) {

    Users.hasOne(models.User_role,
      {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        }
      });

  };

  return Users;
};