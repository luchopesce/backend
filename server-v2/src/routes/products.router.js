import { Router } from "express";
import {
  productController,
  productIdController,
  createProductController,
} from "../controller/products.controller.js";
import {
  authorizeMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  productController
);

router.get(
  "/:pid/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  productIdController
);

router.post(
  "/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  createProductController
);

export default router;
