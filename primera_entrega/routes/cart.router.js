import { Router, json } from "express";
import CartManager from "../src/cartManager.js";
import ProductManager from "../src/productManager.js";

const cartRouter = Router();
cartRouter.use(json());
const managerCart = new CartManager("./cart.json");
const managerProduct = new ProductManager("./products.json");

cartRouter.get("/:cid", async (req, res) => {
  const cartId = Number(req.params.cid);

  //controlo que cartId sean un numero
  if (isNaN(cartId)) {
    return res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  const getCart = await managerCart.getCartById(cartId);
  if (!getCart) {
    return res.status(400).send({
      error: `El Cart ID: ${cartId} no existe en la lista de cart`,
    });
  } else {
    res.send(getCart);
  }
});

cartRouter.post("/", async (req, res) => {
  const createCart = await managerCart.createCart();
  res.status(201).send(createCart);
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const prodId = Number(req.params.pid);
  const cartId = Number(req.params.cid);

  //controlo que proId y cartId sean un numero
  if (isNaN(prodId) || isNaN(cartId)) {
    return res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  //controlo que el ID del producto exista
  const checkExistProduct = await managerProduct.getProductById(prodId);
  if (!checkExistProduct) {
    return res.status(400).send({
      error: `El Product ID: ${prodId} no existe en la lista de productos`,
    });
  }

  //controlo que el ID del carrito exista
  const checkExistCart = await managerCart.getCartById(cartId);
  if (!checkExistCart) {
    return res.status(400).send({
      error: `El Cart ID: ${cartId} no existe en la lista de cart`,
    });
  } else {
    const addProduct = await managerCart.addProductToCart(cartId, prodId);
    res.status(200).send(addProduct);
  }
});

export default cartRouter;
