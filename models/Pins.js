const sequelize = require('sequelize');
const Schematics = require('./Schematics');
const Images = require('./Images');
const Comments = require('./Comments');
const Users = require('./Users');



module.exports = function(sequelize, DataTypes) {
  var Pins = sequelize.define("Pins", {
    x: { type: DataTypes.INTEGER, allowNull: false },
    y: { type: DataTypes.INTEGER, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false },
    width: { type: DataTypes.INTEGER, allowNull: false },
    height: { type: DataTypes.INTEGER, allowNull: false },
    isPositionOutside: { type: DataTypes.BOOLEAN, allowNull: false },
    isMouseDetected: { type: DataTypes.BOOLEAN, allowNull: false },
    isTouchDetected: { type: DataTypes.BOOLEAN, allowNull: false },
  });

  Pins.associate = function(models) {

    Pins.hasMany(models.Images,
      {
        foreignKey: {
          name: 'pin_id',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });

    Pins.hasMany(models.Comments,
      {
        foreignKey: {
          name: 'pin_id',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });

    Pins.belongsTo(models.Users,
      {
        foreignKey: {
          name: 'user_id',
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
  };

  return Pins;
};