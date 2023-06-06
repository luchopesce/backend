import { Router } from "express";
import {
  getCartController,
  getCartIdController,
  createCartController,
  productInCartController,
  updateCartController,
  insertProductInCartController,
  deleteCartController,
  deleteProductInCartController,
} from "../controller/cart.controller.js";
import {
  authorizeMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  getCartController
);

router.get(
  "/:cid/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  getCartIdController
);

router.post(
  "/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  createCartController
);

router.post(
  "/:cid/products/:pid",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  productInCartController
);

router.put(
  "/:cid/products/:pid",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  updateCartController
);

router.put(
  "/:cid/",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  insertProductInCartController
);

router.delete(
  "/:cid/products/:pid",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  deleteProductInCartController
);

router.delete(
  "/:cid",
  authMiddleware("jwt", { session: true }),
  authorizeMiddleware("admin"),
  deleteCartController
);

export default router;
