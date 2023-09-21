import db from "../models/index";

let handleLoadGenre = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.TheLoais.findAll({
        raw: true,
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadCatalog = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.DanhMucs.findAll({
        raw: true,
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleLoadGenre: handleLoadGenre,
  handleLoadCatalog: handleLoadCatalog,
};
