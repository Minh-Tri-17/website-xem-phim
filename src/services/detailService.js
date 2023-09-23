import db from "../models/index";

let handleLoadRelate = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Phims.findAll({
        include: [
          {
            model: db.TheLoais,
            where: { id: dataReq.idTheLoai },
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

let handleLoadComment = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.DanhGias.findAll({
        include: [
          {
            model: db.Phims,
            where: { id: dataReq.id },
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

let handleLoadCountComment = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.DanhGias.findAndCountAll({
        include: [
          {
            model: db.Phims,
            where: { id: dataReq.id },
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

let handleLoadGenreMovie = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.TheLoais.findAll({
        include: [
          {
            model: db.Phims,
            where: { id: dataReq.id },
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

let handleLoadInfoMovie = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.ThongTinPhims.findAll({
        include: [
          {
            model: db.Phims,
            where: { id: dataReq.id },
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

let handleCreateComment = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dataReq);
      await db.DanhGias.create(
        {
          NoiDung: dataReq.comment,
          Diem: dataReq.score,
          PhimId: dataReq.id,
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

let UpdateView = (dataReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await db.Phims.findOne({
        where: { id: dataReq.id },
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
