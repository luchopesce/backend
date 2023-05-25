import express from "express";
import { options } from "./config/config.js";
import { toysRouter } from "./router/toys.router.js";
import { usersRouter } from "./router/users.router.js";
import { categoryRouter } from "./router/category.router.js";

const app = express();
const port = options.server.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/toys", toysRouter);
app.use("/api/users", usersRouter);
app.use("/api/category", categoryRouter)

