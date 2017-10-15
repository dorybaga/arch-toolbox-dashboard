module.exports = function(sequelize, DataTypes) {
  var Schematics = sequelize.define("Schematics", {
    image_url: DataTypes.TEXT,
    address: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Schematics;
};