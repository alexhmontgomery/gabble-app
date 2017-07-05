'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Gabs',
      'showDelete', {
        type: Sequelize.BOOLEAN
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Gabs',
      'showDelete'
    )
  }
}
