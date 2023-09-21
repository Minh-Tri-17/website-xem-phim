import db from "../models/index";

let handleLoadRelate = (idTheLoai) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [
          {
            model: db.TheLoais,
            where: { id: idTheLoai },
          },
        ],
        raw: false,
        limit: 6,
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadTop10View = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [
          {
            model: db.TheLoais,
          },
        ],
        raw: false,
        limit: 10,
        order: [["LuotXem", "DESC"]],
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadComment = (idPhim) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.DanhGias.findAll({
        include: [
          {
            model: db.Phims,
            where: { id: idPhim },
          },
          {
            model: db.TaiKhoans,
          },
        ],
        raw: false,
        limit: 10,
        nest: true,
      });

      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadCountComment = (idPhim) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.DanhGias.findAndCountAll({
        include: [
          {
            model: db.Phims,
            where: { id: idPhim },
          },
        ],
        nest: true,
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoadGenreMovie = (idPhim) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.TheLoais.findAll({
        include: [
          {
            model: db.Phims,
            where: { id: idPhim },
          },
        ],
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

let handleLoadInfoMovie = (idPhim) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.ThongTinPhims.findAll({
        include: [
          {
            model: db.Phims,
            where: { id: idPhim },
          },
        ],
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

let handleCreateComment = (idPhim, comment, score) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.DanhGias.create(
        {
          NoiDung: comment,
          Diem: score,
          PhimId: idPhim,
          TaiKhoanId: 1,
        },
        {
          include: [
            {
              model: db.Phims,
            },
          ],
        }
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateView = (idPhim) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await db.Phims.findOne({
        where: { id: idPhim },
      });

      if (movie) {
        movie.LuotXem = movie.LuotXem + 1;
        await movie.save();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleLoadRelate: handleLoadRelate,
  handleLoadTop10View: handleLoadTop10View,
  handleLoadComment: handleLoadComment,
  handleLoadGenreMovie: handleLoadGenreMovie,
  handleLoadCountComment: handleLoadCountComment,
  handleLoadInfoMovie: handleLoadInfoMovie,
  handleCreateComment: handleCreateComment,
  UpdateView: UpdateView,
};
