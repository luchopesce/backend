import express from "express";
import cartRouter from "./routes/cart.router.js"
import productsRouter from "./routes/products.router.js";

const app = express();

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
