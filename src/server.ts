import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./database/mongo.js";
import swaggerMiddlewares from "./middleware/swagger-middlewares";
import movieRoute from "./router/routes.js";
import passportRouter from "./router/passport-route.js";
import createCredentials from "./config/passport.js";
import session from "express-session";
import passport from "passport";

dotenv.config();
connect();
createCredentials();

const server = express();
server.use(bodyParser.json());

server.use(
  session({
    secret: process.env.SECRET_SESSION!,
    resave:true,
    saveUninitialized:true,
    cookie:{secure:false}
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(cors());
server.use("/images", express.static("public/storage"));
server.use("/users/avatar", express.static("avatar/users"));

server.use("/api", movieRoute);
server.use("/auth", passportRouter);

server.use("/", ...swaggerMiddlewares);

server.listen(process.env.PORT || 3005, () =>
  console.log("Server is listening at http://localhost:3005")
);
