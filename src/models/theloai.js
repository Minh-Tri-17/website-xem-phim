"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TheLoais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TheLoais.init(
    {
      TenTheLoai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TheLoais",
    }
  );
  return TheLoais;
};
