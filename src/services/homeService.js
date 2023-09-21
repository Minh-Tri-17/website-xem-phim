import db from "../models/index";
import { Op } from "sequelize";

let handleLoad10Movie = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [
          {
            model: db.TheLoais,
            where: { TenTheLoai: { [Op.ne]: "Phim hoạt hình" } },
          },
        ],
        raw: true,
        limit: 10,
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

let handleLoad10Cartoon = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [
          {
            model: db.TheLoais,
            where: { TenTheLoai: "Phim hoạt hình" },
          },
        ],
        raw: true,
        limit: 10,
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

let handleLoad10Series = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [
          {
            model: db.DanhMucs,
            where: { TenDanhMuc: "Series" },
          },
        ],
        raw: true,
        limit: 10,
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadMovieSlide = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        raw: true,
        limit: 10,
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadTopSlide = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        where: { Poster: { [Op.ne]: "null" } },
        raw: true,
        limit: 5,
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadDetailMovie = (idPhim) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findOne({
        where: { id: idPhim },
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

let handleLoadTop1Movie = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let top1 = await db.Phims.max("LuotXem");
      let data = await db.Phims.findOne({
        include: [
          {
            model: db.TheLoais,
          },
        ],
        where: { LuotXem: top1 },
        nest: true,
        raw: false,
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
  handleLoad10Movie: handleLoad10Movie,
  handleLoad10Cartoon: handleLoad10Cartoon,
  handleLoad10Series: handleLoad10Series,
  handleLoadMovieSlide: handleLoadMovieSlide,
  handleLoadTopSlide: handleLoadTopSlide,
  handleLoadDetailMovie: handleLoadDetailMovie,
  handleLoadTop1Movie: handleLoadTop1Movie,
};
