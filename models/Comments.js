const sequelize = require('sequelize');
const Pins = require('./Pins');


module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments",
   {
    body: { type: DataTypes.TEXT, allowNull: false }
  });

  Comments.associate = function(models) {

    Comments.belongsTo(models.Pins,
      {
        foreignKey: {
          name: 'pin_id',
          allowNull: false
        }
      });

    Comments.belongsTo(models.Users,
      {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        }
      });

  };

  return Comments;
};