import db from "../models/index";
import { Sequelize } from "sequelize";

let handleLoadUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.TaiKhoans.findAll({});
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadMovies = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [{ model: db.TheLoais }, { model: db.DanhMucs }],
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadInfoMovies = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.ThongTinPhims.findAll({
        include: [{ model: db.Phims }],
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadComment = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.DanhGias.findAll({
        include: [{ model: db.TaiKhoans }, { model: db.Phims }],
      });

      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadGenre = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.TheLoais.findAll({});
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
      let data = await db.DanhMucs.findAll({});
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadCountView = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.sum("LuotXem");
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadCountUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.TaiKhoans.findAndCountAll({});
      if (data) {
        resolve(data.count);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadCountComment = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.DanhGias.findAndCountAll({});
      if (data) {
        resolve(data.count);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadViewGenre = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [{ model: db.DanhMucs }],
        attributes: [
          [Sequelize.fn("sum", Sequelize.col("LuotXem")), "LuotXem"],
        ],
        group: "TenDanhMuc",
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let CreateUser = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.TaiKhoans.create({
        Email: dataReq.email,
        MatKhau: dataReq.password,
        Quyen: "admin",
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateUser = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.TaiKhoans.findOne({
        where: { id: dataReq.idTK },
      });
      if (user) {
        if (dataReq.email) {
          user.Email = dataReq.email;
        }
        if (dataReq.password) {
          user.MatKhau = dataReq.password;
        }
        await user.save();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let DeleteUser = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.TaiKhoans.destroy({
        where: {
          id: dataReq.idTK,
        },
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let CreateInfoMovie = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ThongTinPhims.create({
        PhimId: dataReq.movie,
        DienVien: dataReq.performer,
        DaoDien: dataReq.director,
        QuocGia: dataReq.country,
        NamSanXuat: dataReq.year,
        ThoiLuong: dataReq.time,
        TomTat: dataReq.summary,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateInFoMovie = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let infoMovie = await db.ThongTinPhims.findOne({
        where: { id: dataReq.idTTP },
      });

      if (infoMovie) {
        if (dataReq.movie) {
          infoMovie.PhimId = dataReq.movie;
        }
        if (dataReq.performer) {
          infoMovie.DienVien = dataReq.performer;
        }
        if (dataReq.director) {
          infoMovie.DaoDien = dataReq.director;
        }
        if (dataReq.country) {
          infoMovie.QuocGia = dataReq.country;
        }
        if (dataReq.year) {
          infoMovie.NamSanXuat = dataReq.year;
        }
        if (dataReq.time) {
          infoMovie.ThoiLuong = dataReq.time;
        }
        if (dataReq.summary) {
          infoMovie.TomTat = dataReq.summary;
        }
        await infoMovie.save();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let DeleteInforMovie = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ThongTinPhims.destroy({
        where: {
          id: dataReq.idIM,
        },
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let CreateMovie = (dataReq, dataFile1, dataFile2) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Phims.create({
        TenPhim: dataReq.nameMovies,
        Anh: dataFile1,
        Link: dataFile2,
        Poster: dataReq.poster,
        LuotXem: 0,
      });

      let idP = await db.Phims.max("id");

      await db.TheLoaiPhims.create({
        PhimId: idP,
        TheLoaiId: dataReq.genre,
      });

      await db.DanhMucPhims.create({
        PhimId: idP,
        DanhMucId: dataReq.catalog,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateMovie = (dataReq, dataFile1, dataFile2) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await db.Phims.findOne({
        where: { id: dataReq.idP },
      });

      if (movie) {
        if (dataReq.nameMovies) {
          movie.TenPhim = dataReq.nameMovies;
        }
        if (dataFile1) {
          movie.Anh = dataFile1;
        }
        if (dataFile2) {
          movie.Link = dataFile2;
        }
        if (dataReq.poster) {
          movie.Poster = dataReq.poster;
        }
        await movie.save();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let DeleteMovie = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataCheck = await db.ThongTinPhims.findOne({
        where: { PhimId: dataReq.idP },
      });
      if (dataCheck) {
        resolve();
      } else {
        await db.Phims.destroy({
          where: {
            id: dataReq.idP,
          },
        });
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let CreateGenre = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.TheLoais.create({
        TenTheLoai: dataReq.nameGenre,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateGenre = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let genre = await db.TheLoais.findOne({
        where: { id: dataReq.idTL },
      });
      if (genre) {
        if (dataReq.nameGenre) {
          genre.TenTheLoai = dataReq.nameGenre;
        }
        await genre.save();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let DeleteGenre = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataCheck = await db.TheLoaiPhims.findOne({
        where: { TheLoaiId: dataReq.idTL },
      });
      if (dataCheck) {
        resolve();
      } else {
        await db.TheLoais.destroy({
          where: {
            id: dataReq.idTL,
          },
        });
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let CreateCatalog = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.DanhMucs.create({
        TenDanhMuc: dataReq.nameCatalog,
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateCatalog = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let catalog = await db.DanhMucs.findOne({
        where: { id: dataReq.idDM },
      });
      if (catalog) {
        if (dataReq.nameCatalog) {
          catalog.TenDanhMuc = dataReq.nameCatalog;
          await catalog.save();
        }
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let DeleteCatalog = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataCheck = await db.DanhMucPhims.findOne({
        where: { DanhMucId: dataReq.idDM },
      });
      if (dataCheck) {
        resolve();
      } else {
        await db.DanhMucs.destroy({
          where: {
            id: dataReq.idDM,
          },
        });
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleLoadUser: handleLoadUser,
  handleLoadMovies: handleLoadMovies,
  handleLoadInfoMovies: handleLoadInfoMovies,
  handleLoadComment: handleLoadComment,
  handleLoadGenre: handleLoadGenre,
  handleLoadCatalog: handleLoadCatalog,

  handleLoadCountUser: handleLoadCountUser,
  handleLoadCountComment: handleLoadCountComment,
  handleLoadCountView: handleLoadCountView,
  handleLoadViewGenre: handleLoadViewGenre,

  CreateUser: CreateUser,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser,

  CreateInfoMovie: CreateInfoMovie,
  DeleteInforMovie: DeleteInforMovie,
  UpdateInFoMovie: UpdateInFoMovie,

  CreateMovie: CreateMovie,
  DeleteMovie: DeleteMovie,
  UpdateMovie: UpdateMovie,

  CreateGenre: CreateGenre,
  DeleteGenre: DeleteGenre,
  UpdateGenre: UpdateGenre,

  CreateCatalog: CreateCatalog,
  DeleteCatalog: DeleteCatalog,
  UpdateCatalog: UpdateCatalog,
};
