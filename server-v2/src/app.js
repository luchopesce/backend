import express from "express";
import { options } from "./config/options.config.js";
import { MongooseDB } from "./db/mongo.db.js";
import {__dirname} from "./utils.js";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import authRouter from "./routes/auth.router.js";
import { Server } from "socket.io";
import { initialzedPassport } from "./config/passport.config.js";
import passport from "passport";

const app = express();
const httpServer = app.listen(options.server.port, () => {
  console.log(`Server listening on port: ${options.server.port}`);
});

export const io = new Server(httpServer);

MongooseDB.getInstance();
initialzedPassport()

app.use(express.json());
app.use(express.static(__dirname + "/../src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize())

app.engine(
  "handlebars",
  engine()
);

app.set("view engine", "handlebars");
app.set("views", __dirname + '/views');

//routes
app.use(viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/auth", authRouter);
