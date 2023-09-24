import adminService from "../services/adminService";
import multer from "multer";
import fs from "fs";

let getPageAdmin = async (req, res) => {
  let dataUser = await adminService.handleLoadUser();
  let dataMovie = await adminService.handleLoadMovies();
  let dataInfoMovie = await adminService.handleLoadInfoMovies();
  let dataComment = await adminService.handleLoadComment();
  let dataGenre = await adminService.handleLoadGenre();
  let dataCatalog = await adminService.handleLoadCatalog();
  let countUser = await adminService.handleLoadCountUser();
  let countComment = await adminService.handleLoadCountComment();
  let countView = await adminService.handleLoadCountView();
  let dataView = await adminService.handleLoadViewGenre();

  return res.render("admin.ejs", {
    dataUser,
    dataMovie,
    dataInfoMovie,
    dataComment,
    dataGenre,
    dataCatalog,
    countUser,
    countComment,
    countView,
    dataView,
  });
};

let handleCreate = async (req, res) => {
  let dataReq = req.body;

  if (dataReq.email && dataReq.password) {
    await adminService.CreateUser(dataReq);
  }

  if (dataReq.movie) {
    await adminService.CreateInfoMovie(dataReq);
  }

  if (dataReq.nameMovies) {
    await adminService.CreateMovie(dataReq);
  }

  if (dataReq.nameGenre) {
    await adminService.CreateGenre(dataReq);
  }

  if (dataReq.nameCatalog) {
    await adminService.CreateCatalog(dataReq);
  }

  return res.redirect("/admin");
};

let handleUpdate = async (req, res) => {
  let dataReq = req.body;
  let dataFile = req.file.originalname;

  if (dataReq.idTK) {
    await adminService.UpdateUser(dataReq);
  }

  if (dataReq.idTTP) {
    await adminService.UpdateInFoMovie(dataReq);
  }

  if (dataReq.idP) {
    await adminService.UpdateMovie(dataReq, dataFile);
  }

  if (dataReq.idTL) {
    await adminService.UpdateGenre(dataReq);
  }

  if (dataReq.idDM) {
    await adminService.UpdateCatalog(dataReq);
  }

  return res.redirect("/admin");
};

let handleDelete = async (req, res) => {
  let dataReq = req.query;

  if (dataReq.idTK) {
    await adminService.DeleteUser(dataReq);
  }

  if (dataReq.idIM) {
    await adminService.DeleteInforMovie(dataReq);
  }

  if (dataReq.idP) {
    await adminService.DeleteMovie(dataReq);
  }

  if (dataReq.idTL) {
    await adminService.DeleteGenre(dataReq);
  }

  if (dataReq.idDM) {
    await adminService.DeleteCatalog(dataReq);
  }

  return res.redirect("/admin");
};

module.exports = {
  getPageAdmin: getPageAdmin,
  handleCreate: handleCreate,
  handleUpdate: handleUpdate,
  handleDelete: handleDelete,
};
