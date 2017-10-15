const sequelize = require('sequelize');
const User_role = require('./User_role');


module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
  },

  Users.associate = function(models) {

    Users.hasOne(models.User_role,
      {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        }
      });

  });

  return Users;
};