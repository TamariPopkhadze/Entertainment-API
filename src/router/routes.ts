import {
  GetMovies,
  Home,
  Reigistration,
  TvSeries,
  emailVerification,
  passwordRecovery,
  passwordRecoverySend,
} from "controllers";
import express from "express";
import multer from "multer";
const Route = express.Router();

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "avatar/users");
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (_req:any, file:any, cb:any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

Route.post("/password/recovery", passwordRecovery);
Route.post("/password/send-link", passwordRecoverySend);
Route.post("/verify", emailVerification);
Route.post(
  "/register",
  multer({ storage: fileStorage, fileFilter }).single("avatar"),
  Reigistration
);
Route.get("/Movies", GetMovies);
Route.get("/Home", Home);
Route.get("/TvSeries", TvSeries);

export default Route;
