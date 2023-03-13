import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const managerProduct = new ProductManager("./products.json");

router.get("/", async (req, res) => {
  const products = await managerProduct.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const { app } = req;
  const io = app.get("io");
  const products = await managerProduct.getProducts();

  io.on("connection", () => {
    io.emit("list-products", products);
  });

  res.render("realtimeproducts");
});

export default router;
