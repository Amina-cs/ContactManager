'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('contacts', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Name of the target table
        key: 'id',      // Key in the target table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('contacts', 'UserId');
  }
};