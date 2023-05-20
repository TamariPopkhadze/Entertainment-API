import express from "express"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import cors from 'cors'
import connect from "./database/mongo.js"
import swaggerMiddlewares from "./middleware/swagger-middlewares"
import movieRoute from "./router/routes.js"

const server = express()
dotenv.config()
server.use(bodyParser.json())
connect()
server.use(cors())
server.use("/images", express.static("public/storage"));
server.use("/users/avatar", express.static("avatar/users"));

server.use('/api',movieRoute)

server.use("/", ...swaggerMiddlewares)
server.listen(3005, () => console.log("Server is listening at http://localhost:3005"))