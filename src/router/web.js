import express from "express";
import adminController from "../controllers/adminController";
import detailController from "../controllers/detailController";
import homeController from "../controllers/homeController";
import loginController from "../controllers/loginController";
import moviesController from "../controllers/moviesController";

let router = express.Router();

let initWebRoutes = async (app) => {
  router.get("/", homeController.getPageHome);
  router.get("/handleDetailMovie", homeController.handleDetailMovie);
  router.get("/login", loginController.getPageLogin);
  router.post("/handleLogin", loginController.handleLogin);
  router.post("/handleRegist", loginController.handleRegist);
  router.get("/movies", moviesController.getPageMovies);
  router.get("/detail", detailController.getPageDetail);
  router.get("/handleComment", detailController.handleComment);
  router.get("/admin", adminController.getPageAdmin);

  router.post("/handleCreate", adminController.handleCreate);
  router.post("/handleUpdate", adminController.handleUpdate);
  router.get("/handleDelete", adminController.handleDelete);

  return app.use("/", router);
};

module.exports = initWebRoutes;
