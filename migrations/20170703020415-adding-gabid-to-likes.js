'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Likes',
      'gabId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Gabs',
          key: 'id'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Likes',
      'gabId'
    )
  }
}
