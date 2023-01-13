module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false
      },

    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};