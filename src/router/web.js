import express from "express";
import multer from "multer";
var appRoot = require("app-root-path");
import adminController from "../controllers/adminController";
import detailController from "../controllers/detailController";
import homeController from "../controllers/homeController";
import loginController from "../controllers/loginController";
import moviesController from "../controllers/moviesController";

let router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "fileImage") {
      cb(null, appRoot + "/src/public/images/movies/");
    } else if (file.fieldname === "fileVideo") {
      cb(null, appRoot + "/src/public/video/");
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "fileImage") {
      cb(null, file.originalname);
    } else if (file.fieldname === "fileVideo") {
      cb(null, file.originalname);
    }
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (
    !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4|MP4)$/)
  ) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
}).fields([
  {
    name: "fileImage",
  },
  {
    name: "fileVideo",
  },
]);

let initWebRoutes = async (app) => {
  router.get("/", homeController.getPageHome);
  router.get("/login", loginController.getPageLogin);
  router.get("/movies", moviesController.getPageMovies);
  router.get("/detail", detailController.getPageDetail);
  router.get("/admin", adminController.getPageAdmin);

  router.post("/handleLogin", loginController.handleLogin);
  router.post("/handleRegist", loginController.handleRegist);
  router.get("/handleComment", detailController.handleComment);

  router.post("/handleCreate", upload, adminController.handleCreate);
  router.post("/handleUpdate", upload, adminController.handleUpdate);
  router.get("/handleDelete", adminController.handleDelete);

  return app.use("/", router);
};

module.exports = initWebRoutes;
