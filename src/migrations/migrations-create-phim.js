"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("phims", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TenPhim: {
        type: Sequelize.STRING,
      },
      Anh: {
        type: Sequelize.STRING,
      },
      Poster: {
        type: Sequelize.STRING,
      },
      Link: {
        type: Sequelize.STRING,
      },
      LuotXem: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("phims");
  },
};
