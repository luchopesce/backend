import { Router } from "express";
import {
  homeControllerViews,
  productsControllerViews,
  loginControllerViews,
  perfilControllerViews,
  signupControllerViews,
} from "../controller/views.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", homeControllerViews);
router.get("/products", authMiddleware("jwt"), productsControllerViews);
router.get("/login", authMiddleware("jwt"), loginControllerViews);
router.get(
  "/perfil",
  authMiddleware("jwt", { session: true }),
  perfilControllerViews
);
router.get("/signup", authMiddleware("jwt"), signupControllerViews);

export default router;
