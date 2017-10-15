const sequelize = require('sequelize');
const Projects = require('./Projects');
const Pins = require('./Pins');


module.exports = function(sequelize, DataTypes) {
  var Schematics = sequelize.define("Schematics", {
    image_url: { type: DataTypes.TEXT, allowNull: false}
  });

  Schematics.associate = function(models) {

    Schematics.hasMany(models.Pins,
      {
        foreignKey: {
          name: 'schematic_id',
          allowNull: false
        }
      });

    Schematics.belongsTo(models.Projects,
      {
        foreignKey: {
          name: 'project_id',
          allowNull: false
        }
      });

  };

  return Schematics;
};