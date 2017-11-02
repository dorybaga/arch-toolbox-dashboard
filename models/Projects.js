const sequelize = require('sequelize');
const Schematics = require('./Schematics');
const Users = require('./Users');
const Pins = require('./Pins');


module.exports = function(sequelize, DataTypes) {
  var Projects = sequelize.define("Projects", {
    title: { type: DataTypes.TEXT, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false},
    job_number: { type: DataTypes.INTEGER, allowNull: false},
    client_name: { type: DataTypes.TEXT, allowNull: false},
    creator: { type: DataTypes.TEXT, allowNull: false},
  });

  Projects.associate = function(models) {

    Projects.belongsToMany(models.Users,
      {
        as: 'Projects',
        through: 'UserProjectJoin',
        foreignKey: 'project_id'
      });

    Projects.hasOne(models.Schematics,
      {
        foreignKey: {
          name: 'project_id',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    Projects.hasMany(models.Pins,
      {
        foreignKey: {
          name: 'project_id',
          allowNull: false
        },
        onDelete: 'CASCADE',
        hooks: true
      });

  };

  return Projects;
};