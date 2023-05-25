import express from "express";
import { options } from "./config/options.config";
import { MongooseDB } from "./db/mongo.db";

const app = express();
app.listen(options.server.port, () => {
  console.log(`Server listening on port: ${options.server.port}`);
});

//db
MongooseDB.getInstance()

app.use(express.json());
app.use(express.static(__dirname + "/../src/public"));
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.engine("handlebars", engine({
  extname: ".hbs",
}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.set("io", io);
