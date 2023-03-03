import { Router, json } from "express";
import CartManager from "../src/cartManager.js";
import ProductManager from "../src/productManager.js";

const cartRouter = Router();
cartRouter.use(json());
const managerCart = new CartManager("./cart.json");
const managerProduct = new ProductManager("./products.json");

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  //controlo que {pid y cid} sean un numero
  if (!pid || isNaN(Number(pid)) || !cid || isNaN(Number(cid))) {
    return res.status(400).send({
      error: "Datos invalidos, revise la informacion a cargar",
    });
  }

  //controlo que el ID del producto exista
  const checkExistProduct = await managerProduct.getProductById(Number(pid));
  if (!checkExistProduct) {
    return res.status(400).send({
      error: `El Product ID: ${pid} no existe en la lista de productos`,
    });
  }

  const checkExistProdutInCart = await managerCart.getCartById(Number(cid))

  console.log(checkExistProdutInCart)

  if (checkExistProdutInCart) {
    const updateCart = await managerCart.updateCart(Number(cid), Number(pid));
    res.send(updateCart)
  } else {
    const createCart = await managerCart.addProductToCart(Number(cid), {
      product: Number(pid),
      quantity: 1,
    });
    if (!createCart) {
      return res.status(404).send({
        error: `No se pudo crear el producto, revisar los datos ingresados`,
      });
    } else {
      res.send(createCart);
    }
  }
});

export default cartRouter;
