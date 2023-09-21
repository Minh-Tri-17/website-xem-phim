"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ThongTinPhims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ThongTinPhims.belongsTo(models.Phims);
    }
  }
  ThongTinPhims.init(
    {
      DienVien: DataTypes.STRING,
      QuocGia: DataTypes.STRING,
      DaoDien: DataTypes.STRING,
      TomTat: DataTypes.STRING,
      NamSanXuat: DataTypes.INTEGER,
      ThoiLuong: DataTypes.INTEGER,
      Series: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ThongTinPhims",
    }
  );
  return ThongTinPhims;
};
