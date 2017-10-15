const sequelize = require('sequelize');
const Users = require('./Users');


module.exports = function(sequelize, DataTypes) {
  var User_role = sequelize.define("User_role", {
    role: DataTypes.TEXT
  },

  Users.associate = function(models) {

    User_role.belongsTo(models.Users,
      {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        }
      });

  });

  return User_role;
};