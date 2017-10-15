const sequelize = require('sequelize');
const Schematics = require('./Schematics');
const Images = require('./Images');
const Comments = require('./Comments');



module.exports = function(sequelize, DataTypes) {
  var Pins = sequelize.define("Pins", {
    x_axis: DataTypes.INT,
    y_axis: DataTypes.INT,
  },

  Pins.associate = function(models) {

    Pins.hasMany(models.Images,
      {
        foreignKey: {
          name: 'pin_id',
          allowNull: false
        }
      });

    Pins.hasMany(models.Comments,
      {
        foreignKey: {
          name: 'pin_id',
          allowNull: false
        }
      });

    Pins.belongsTo(models.Schematics,
      {
        foreignKey: {
          name: 'schematic_id',
          allowNull: false
        }
      });

  });

  return Pins;
};