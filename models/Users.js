const sequelize = require('sequelize');



module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstName: { type: DataTypes.TEXT, allowNull: false},
    lastName: { type: DataTypes.TEXT, allowNull: false},
    email: { type: DataTypes.TEXT, allowNull: false},
    password: { type: DataTypes.TEXT, allowNull: false},
    user_role: { type: DataTypes.TEXT, allowNull: false}
  },{
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Users;
};