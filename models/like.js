'use strict'
module.exports = function (sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    username: DataTypes.STRING
  }, {})

  Like.associate = function (models) {
    Like.belongsTo(models.Gab, {as: 'gab', foreignKey: 'gabId'})
  }

  return Like
}
