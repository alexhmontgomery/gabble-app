'use strict'
module.exports = function (sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    content: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 140],
          msg: 'Gabs can must be 140 characters or less!'
        }
      }
    },
    username: DataTypes.STRING
  }, {})

  Gab.associate = function (models) {
    Gab.hasMany(models.Like, {as: 'like', foreignKey: 'gabId'})
  }

  return Gab
}
