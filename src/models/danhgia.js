"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DanhGias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DanhGias.belongsTo(models.TaiKhoans);
      DanhGias.belongsTo(models.Phims);
    }
  }
  DanhGias.init(
    {
      NoiDung: DataTypes.STRING,
      Diem: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DanhGias",
    }
  );
  return DanhGias;
};
