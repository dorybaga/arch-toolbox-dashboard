const sequelize = require('sequelize');
const Pins = require('./Pins');


module.exports = function(sequelize, DataTypes) {
  var Images = sequelize.define("Images", {
    image_url: DataTypes.TEXT,
  });

  Images.associate = function(models) {

    Images.belongsTo(models.Pins,
      {
        foreignKey: {
          name: 'pin_id',
          allowNull: false
        }
      });

    Images.belongsTo(models.Users,
      {
        foreignKey: {
          name: 'user_id',
          allowNull: false
        }
      });

  };

  return Images;
};