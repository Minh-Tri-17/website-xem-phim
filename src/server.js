import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebEngine from "./router/web";
import cors from "cors";
require("dotenv").config();

let app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebEngine(app);

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Backend NodeJs port:", port);
});
