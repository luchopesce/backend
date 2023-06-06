import { Router } from "express";
import { ProductManager } from "../dao/product.dao.js";
import { io } from "../app.js";

const router = Router();

export const getProductController = async (req, res) => {
  const { limit, page, sort, title, stock } = req.query;

  let options = {
    lean: true,
    limit: limit ?? 10,
    page: page ?? 1,
    sort: { price: sort },
  };
  let query = {};
  if (title) {
    query.title = { $regex: new RegExp(title) };
  }
  if (stock) {
    query.stock = Number(stock);
  }

  try {
    const paginate = await ProductManager.paginateProducts(query, options);
    res.status(200).send({ status: "ok", payload: paginate });
  } catch (err) {
    res.status(400).send({ status: "error", payload: err.message });
  }
};

export const getProductIdController = async (req, res) => {
  const pid = req.params.pid;
  try {
    const result = await ProductManager.getProductById(pid);
    if (!result) {
      return res
        .status(400)
        .json({ status: "error", id: pid, payload: "Product no exists" });
    } else {
      return res.json(result);
    }
  } catch (err) {
    return res.status(400).json({ status: "error", payload: err.message });
  }
};

export const createProductController = async (req, res) => {
  const products = await ProductManager.getProducts();
  const { title, description, code, price, stock, category, thumbnail } =
    req.body;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnail
  ) {
    return res
      .status(400)
      .json({ status: "error", payload: "Missing parameters" });
  }

  if (products.some((product) => product.code === code)) {
    res.status(400).send({
      status: "error",
      code: code,
      payload: "Code existing, change this code",
    });
  } else {
    const result = await ProductManager.createProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail: [],
    });

    if (!result) {
      return res
        .status(404)
        .json({ status: "error", payload: "Check paramaters" });
    } else {
      const paginate = await ProductManager.paginateProducts();
      io.emit("list-products", paginate);
      return res.status(201).json({ status: "ok", payload: result });
    }
  }
};

export const updateProductController = async (req, res) => {
  const { pid } = req.params;
  const obj = req.body;
  if (Object.entries(obj).length < 1) {
    return res
      .status(400)
      .json({ status: "error", payload: "Missing parameters" });
  }

  try {
    const result = await ProductManager.updateProduct(pid, obj);
    if (!result) {
      return res
        .status(400)
        .json({ status: "error", id: pid, payload: "Product no exists" });
    } else {
      const paginate = await ProductManager.paginateProducts();
      io.emit("list-products", paginate);
      return res.status(200).json({ status: "ok", payload: result });
    }
  } catch (err) {
    res.status(400).json({ status: "error", payload: err.message });
  }
};

export const deleteProductController = async (req, res) => {
  const pid = req.params.pid;

  try {
    const result = await ProductManager.deleteProduct(pid);
    if (!result) {
      return res
        .status(400)
        .json({ status: "error", id: pid, payload: "Product no exists" });
    } else {
      const paginate = await ProductManager.paginateProducts();
      io.emit("list-products", paginate);
      return res.status(200).json({ status: "ok", payload: result });
    }
  } catch (err) {
    return res.status(400).json({ status: "error", payload: err.message });
  }
};

export default router;
