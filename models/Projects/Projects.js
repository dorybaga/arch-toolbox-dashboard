module.exports = function(sequelize, DataTypes) {
  var Projects = sequelize.define("Projects", {
    title: DataTypes.TEXT,
    address: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Projects;
};