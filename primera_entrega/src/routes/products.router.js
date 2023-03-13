import { Router, json } from "express";
import ProductManager from "../productManager.js";

const productsRouter = Router();
const managerProduct = new ProductManager("./products.json");
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await managerProduct.getProducts();
  if (!products) {
    return res.status(404).send({ error: `No existen productos` });
  } else if (limit > 0) {
    const productLimit = products.splice(0, limit);
    res.json(productLimit);
  } else {
    res.json(products);
  }
});

productsRouter.get("/:pid/", async (req, res) => {
  const prodId = Number(req.params.pid);

  //controlo que proId sea un numero
  if (isNaN(prodId)) {
    return res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  const product = await managerProduct.getProductById(prodId);
  if (!product) {
    return res
      .status(404)
      .send({ error: `No existe el producto con el ID ${prodId}` });
  } else {
    res.json(product);
  }
});

productsRouter.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnail } =
    req.body;
  const { app } = req;
  const io = app.get("io");

  const newProduct = {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail,
  };

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnail
  ) {
    res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  const createProduct = await managerProduct.addProduct(newProduct);

  if (!createProduct) {
    return res.status(404).send({
      error: `No se pudo crear el producto, revisar los datos ingresados`,
    });
  }
  res.send(newProduct);

  io.emit("list-products", createProduct);
});

productsRouter.put("/:pid", async (req, res) => {
  const prodId = Number(req.params.pid);
  const newObj = req.body;
  const { app } = req;
  const io = app.get("io");

  //controlo que {pid} sea un numero y que el objeto "newObj" no este vacio
  if (isNaN(prodId) || Object.entries(newObj).length < 1) {
    return res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  //controlo que el ID exista
  const checkExistProduct = await managerProduct.getProductById(prodId);
  if (!checkExistProduct) {
    return res.status(400).send({
      error: `El ID: ${pid} no existe en la lista de productos`,
    });
  }

  const productUpdate = await managerProduct.updateProduct(prodId, newObj);
  res.status(200).send(productUpdate);
  io.emit("list-products", productUpdate);
});

productsRouter.delete("/:pid", async (req, res) => {
  const prodId = Number(req.params.pid);
  const { app } = req;
  const io = app.get("io");

  //controlo que {pid} sea un numero
  if (isNaN(prodId)) {
    return res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  //controlo que el ID exista
  const checkExistProduct = await managerProduct.getProductById(prodId);
  if (!checkExistProduct) {
    return res.status(400).send({
      error: `El ID: ${pid} no existe en la lista de productos`,
    });
  }

  const productDelete = await managerProduct.deleteProduct(prodId);
  res.status(200).send(productDelete);
  io.emit("list-products", productDelete);
});

export default productsRouter;
