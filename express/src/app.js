import express from "express"
import ProductManager from "./ProductManager.js"

const app = express()
const manager = new ProductManager("../Productos.json")

app.get("/productos", async (req, res) => {
    const { limit } = req.query
    const products = await manager.getProducts()
    if (!products) {
        return res
            .status(404)
            .send({ error: `No existen productos` })
    }
    else if (limit > 0){
        const productLimit = products.splice(0, limit)
        res.json(productLimit)
    }
    else{
        res.json(products)
    }
})

app.get("/productos/:pid/", async (req, res) => {
    const { pid } = req.params
    const product = await manager.getProductById(Number(pid))
    if (!product) {
        return res
            .status(404)
            .send({ error: `No existe el producto con el ID ${req.params.id}` })
    }
    res.json(product)
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})