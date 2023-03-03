import { Router, json } from "express";
import ProductManager from "../src/productManager.js";

const productsRouter = Router();
productsRouter.use(json());
const managerProduct = new ProductManager("./products.json");

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
  const { pid } = req.params;
  const product = await managerProduct.getProductById(Number(pid));
  if (!product) {
    return res
      .status(404)
      .send({ error: `No existe el producto con el ID ${req.params.id}` });
  }
  res.json(product);
});

productsRouter.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnail } =
    req.body;

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
});

productsRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const newObj = req.body;

  //controlo que {pid} sea un numero y que el objeto "newObj" no este vacio
  if (!pid || isNaN(Number(pid)) || Object.entries(newObj).length < 1) {
    return res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  //controlo que el ID exista
  const checkExistProduct = await managerProduct.getProductById(Number(pid));
  if (!checkExistProduct) {
    return res.status(400).send({
      error: `El ID: ${pid} no existe en la lista de productos`,
    });
  }

  const productUpdate = await managerProduct.updateProduct(Number(pid), newObj);
  res.status(200).send(productUpdate)
});

productsRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  //controlo que {pid} sea un numero
  if (!pid || isNaN(Number(pid))) {
    return res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  //controlo que el ID exista
  const checkExistProduct = await managerProduct.getProductById(Number(pid));
  if (!checkExistProduct) {
    return res.status(400).send({
      error: `El ID: ${pid} no existe en la lista de productos`,
    });
  }

  const productDelete = await managerProduct.deleteProduct(Number(pid));
  res.status(200).send(productDelete)
});

export default productsRouter;
