'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('session_instances', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      sessionScheduleId: {
        type: Sequelize.UUID,
        references: {
          model: 'session_schedules',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
      },
      durationMinutes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      datatime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('session_instances');
  },
};
