"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaiKhoans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TaiKhoans.hasMany(models.DanhGias);
    }
  }
  TaiKhoans.init(
    {
      Email: DataTypes.STRING,
      MatKhau: DataTypes.STRING,
      Quyen: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TaiKhoans",
    }
  );
  return TaiKhoans;
};
