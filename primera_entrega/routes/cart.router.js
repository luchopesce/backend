import { Router, json } from "express";
import CartManager from "../src/cartManager.js";
import ProductManager from "../src/productManager.js";

const cartRouter = Router();
cartRouter.use(json());
const managerCart = new CartManager("./cart.json");
const managerProduct = new ProductManager("./products.json");

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

  const checkExistCart = await managerCart.getCartById(cartId);
  if (checkExistCart) {
    const updateCart = await managerCart.updateCart(cartId, prodId);
    res.send(updateCart);
  } else {
    const createCart = await managerCart.addProductToCart(cartId, prodId);
    res.send(createCart);
  }
});

export default cartRouter;
