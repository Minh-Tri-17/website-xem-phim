"use strict";
const { Model } = require("sequelize");
const phim = require("./phim");
const theloai = require("./theloai");
module.exports = (sequelize, DataTypes) => {
  class TheLoaiPhims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Phims.belongsToMany(models.TheLoais, {
        through: TheLoaiPhims,
      });
      models.TheLoais.belongsToMany(models.Phims, {
        through: TheLoaiPhims,
      });
    }
  }
  TheLoaiPhims.init(
    {},
    {
      sequelize,
      modelName: "TheLoaiPhims",
    }
  );
  return TheLoaiPhims;
};
