const sequelize = require('sequelize');
const Schematics = require('./Schematics');


module.exports = function(sequelize, DataTypes) {
  var Projects = sequelize.define("Projects", {
    title: DataTypes.TEXT,
    address: DataTypes.TEXT,
  },

  Projects.associate = function(models) {

    Projects.hasOne(models.Schematics,
      {
        foreignKey: {
          name: 'project_id',
          allowNull: false
        }
      });

  });

  return Projects;
};