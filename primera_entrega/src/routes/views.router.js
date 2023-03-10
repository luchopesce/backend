import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router()
const managerProduct = new ProductManager("./products.json");

router.get("/",  async (req, res) =>{
    const products = await managerProduct.getProducts();
    console.log(products)
    res.render("home", {products})
})

router.get("/realtimeproducts",  async (req, res) =>{
    const products = await managerProduct.getProducts();
    res.render("realTimeProducts", {products})
})

export default router