const sequelize = require('sequelize');



module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
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