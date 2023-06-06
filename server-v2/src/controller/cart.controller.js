import { Router } from "express";
import { CartManager } from "../dao/cart.dao.js";
import { io } from "../app.js";

const router = Router();

const sendMessage = async (cid) => {
  const carts = await CartManager.getCartById(cid);
  io.emit("list-carts", carts);
};

export const getCartController = async (req, res) => {
  const { limit } = req.query;
  const carts = await CartManager.getCarts();
  if (limit > 0) {
    const cartLimit = carts.splice(0, limit);
    return res.json(cartLimit);
  } else {
    return res.json(carts);
  }
};

export const getCartIdController = async (req, res) => {
  const cid = req.params.cid;
  try {
    const result = await CartManager.getCartById(cid);
    if (!result) {
      return res
        .status(400)
        .json({ status: "error", id: cid, payload: "Cart no exists" });
    } else {
      return res.json(result);
    }
  } catch (err) {
    return res.status(400).json({ status: "error", payload: err.message });
  }
};

export const createCartController = async (req, res) => {
  const result = await CartManager.createCart();
  await sendMessage();
  return res.status(201).json({ status: "ok", payload: result });
};

export const productInCartController = async (req, res) => {
  const prodId = req.params.pid;
  const cartId = req.params.cid;
  try {
    const result = await CartManager.addProductToCart(cartId, prodId, null);
    if (!result) {
      return res.status(400).json({
        status: "error",
        idCart: cartId,
        idProduct: prodId,
        payload: "Cart or Product no exists",
      });
    } else {
      await sendMessage(cartId);
      return res.status(201).json({ status: "ok", payload: result });
    }
  } catch (err) {
    return res.status(400).json({ status: "error", payload: err.message });
  }
};

export const updateCartController = async (req, res) => {
  const prodId = req.params.pid;
  const cartId = req.params.cid;
  const quantity = req.body;

  if (Object.entries(quantity).length < 1 && !quantity) {
    return res
      .status(400)
      .json({ status: "error", payload: "Missing parameters" });
  }

  try {
    const result = await CartManager.updateProductQuantity(
      cartId,
      prodId,
      quantity
    );
    if (!result) {
      return res.status(400).json({
        status: "error",
        idCart: cartId,
        idProduct: prodId,
        params: quantity,
        payload: "Cart, Product no exists or check your parameters",
      });
    } else {
      await sendMessage(cartId);
      return res.status(201).json({ status: "ok", payload: result });
    }
  } catch (err) {
    return res.status(400).json({ status: "error", payload: err.message });
  }
};

export const insertProductInCartController = async (req, res) => {
  const cartId = req.params.cid;
  const obj = req.body;

  if (Object.entries(obj).length < 1) {
    return res
      .status(400)
      .json({ status: "error", payload: "Missing parameters" });
  }

  try {
    const result = await CartManager.addProductToCart(cartId, null, obj);
    if (!result) {
      res.status(400).send({
        status: "error",
        idCart: cartId,
        payload: "Cart no exists",
      });
    } else {
      await sendMessage(cartId);
      return res.status(201).json({ status: "ok", payload: result });
    }
  } catch (err) {
    return res.status(400).json({ status: "error", payload: err.message });
  }
};

export const deleteProductInCartController = async (req, res) => {
  const prodId = req.params.pid;
  const cartId = req.params.cid;
  try {
    const result = await CartManager.deleteProductInCart(cartId, prodId);
    if (!result) {
      res.status(400).send({
        status: "error",
        idCart: cartId,
        idProduct: prodId,
        payload: "Cart or Product no exists",
      });
    } else {
      await sendMessage(cartId);
      return res.status(200).json({ status: "ok", payload: result });
    }
  } catch (err) {
    return res.status(400).json({ status: "error", payload: err.message });
  }
};

export const deleteCartController = async (req, res) => {
  const cid = req.params.cid;
  try {
    const result = await CartManager.deleteCart(cid);
    if (!result) {
      return res
        .status(400)
        .json({ status: "error", id: cid, payload: "Cart no exists" });
    } else {
      await sendMessage(cid);
      return res.status(200).json({ status: "ok", payload: result });
    }
  } catch (err) {
    return res.status(400).json({ status: "error", payload: err.message });
  }
};

export default router;
