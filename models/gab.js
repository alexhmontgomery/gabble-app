'use strict'
module.exports = function (sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    content: DataTypes.TEXT,
    username: DataTypes.STRING
  }, {})

  Gab.associate = function (models) {
    Gab.hasMany(models.Like, {as: 'like', foreignKey: 'gabId'})
  }

  return Gab
}
