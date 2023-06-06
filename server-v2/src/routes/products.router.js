import { Router } from "express";
import {
  getProductController,
  getProductIdController,
  createProductController,
  updateProductController,
  deleteProductController,
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
  getProductController
);

router.get(
  "/:pid/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  getProductIdController
);

router.post(
  "/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  createProductController
);

router.put(
  "/:pid/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  updateProductController
);

router.delete(
  "/:pid/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  deleteProductController
);

export default router;
