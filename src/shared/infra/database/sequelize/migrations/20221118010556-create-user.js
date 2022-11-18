"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("base_user", {
      base_user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: true,
      },
      user_email: {
        type: Sequelize.STRING,
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("base_user");
  },
};
