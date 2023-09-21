"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Phims.hasOne(models.DanhGias);
      Phims.hasOne(models.ThongTinPhims);
    }
  }
  Phims.init(
    {
      TenPhim: DataTypes.STRING,
      Anh: DataTypes.STRING,
      Poster: DataTypes.STRING,
      Link: DataTypes.STRING,
      LuotXem: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Phims",
    }
  );
  return Phims;
};
