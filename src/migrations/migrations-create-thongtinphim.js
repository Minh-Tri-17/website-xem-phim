"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("thongtinphims", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      DienVien: {
        type: Sequelize.STRING,
      },
      QuocGia: {
        type: Sequelize.STRING,
      },
      DaoDien: {
        type: Sequelize.STRING,
      },
      TomTat: {
        type: Sequelize.STRING,
      },
      NamSanXuat: {
        type: Sequelize.INTEGER,
      },
      ThoiLuong: {
        type: Sequelize.INTEGER,
      },
      Series: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      PhimId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("thongtinphims");
  },
};
