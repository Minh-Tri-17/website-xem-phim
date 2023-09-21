import db from "../models/index";
import { Op } from "sequelize";

let handleLoadAllMovie = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll();
      if (data) {
        resolve(data);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadMovieGenre = (idTheLoai) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [{ model: db.TheLoais, where: { id: idTheLoai } }],
      });
      if (data) {
        resolve(data);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadMovieCatalog = (idDanhMuc) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [{ model: db.DanhMucs, where: { id: idDanhMuc } }],
      });
      if (data) {
        resolve(data);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadSeachMovie = (inputSeach) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [
          {
            model: db.DanhMucs,
          },
        ],
        where: { TenPhim: { [Op.like]: `%${inputSeach}%` } },
      });
      console.log(data);
      if (data) {
        resolve(data);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadFilterMovie = (country, year) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [
          {
            model: db.DanhMucs,
          },
          {
            model: db.ThongTinPhims,
            where: {
              QuocGia: { [Op.like]: `%${country}%` },
              NamSanXuat: { [Op.like]: `%${year}%` },
            },
          },
        ],
      });
      console.log(data);
      if (data) {
        resolve(data);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadYearFilter = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.ThongTinPhims.findAll({
        attributes: ["NamSanXuat"],
        group: ["NamSanXuat"],
        distinct: true,
        order: [["NamSanXuat", "ASC"]],
      });
      if (data) {
        resolve(data);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadCountryFilter = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.ThongTinPhims.findAll({
        attributes: ["QuocGia"],
        group: ["QuocGia"],
        distinct: true,
      });
      if (data) {
        resolve(data);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleLoadAllMovie: handleLoadAllMovie,
  handleLoadMovieGenre: handleLoadMovieGenre,
  handleLoadMovieCatalog: handleLoadMovieCatalog,
  handleLoadSeachMovie: handleLoadSeachMovie,
  handleLoadFilterMovie: handleLoadFilterMovie,
  handleLoadYearFilter: handleLoadYearFilter,
  handleLoadCountryFilter: handleLoadCountryFilter,
};
