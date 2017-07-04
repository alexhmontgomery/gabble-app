'use strict'
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter a username'
        },
        isAlphanumeric: {
          msg: 'Username can only contain numbers & letters'
        },
        len: {
          args: [5, 20],
          msg: 'Username must be 5-20 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter a password'
        },
        len: {
          args: [5, 15],
          msg: 'Password must be 5-15 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter a valid email address'
        },
        isEmail: {
          msg: 'Please enter a valid email address'
        }
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return User
}
