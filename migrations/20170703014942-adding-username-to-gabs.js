'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Gabs',
      'username', {
        type: Sequelize.STRING
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Gabs',
      'username'
    )
  }
}
