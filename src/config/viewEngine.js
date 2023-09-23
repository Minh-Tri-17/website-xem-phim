import express from "express";
import session from "express-session";

let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views/pages");
  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: true,
    })
  );
};

module.exports = configViewEngine;
