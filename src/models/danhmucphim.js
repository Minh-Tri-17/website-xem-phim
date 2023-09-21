"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DanhMucPhims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Phims.belongsToMany(models.DanhMucs, { through: DanhMucPhims });
      models.DanhMucs.belongsToMany(models.Phims, { through: DanhMucPhims });
    }
  }
  DanhMucPhims.init(
    {},
    {
      sequelize,
      modelName: "DanhMucPhims",
    }
  );
  return DanhMucPhims;
};
