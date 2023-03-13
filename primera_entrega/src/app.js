import express from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/../public"));
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);
app.use("/realtimeproducts", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

const io = new Server(httpServer);
app.set("io", io);

io.on("connection", (socket) => {
  console.log(`New client connected with id:${socket.id}`)
});
