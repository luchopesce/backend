import { Router } from "express";
import {
  loginController,
  logoutController,
  signUpController,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/login", loginController);

router.post("/signup", signUpController);

router.post("/logout", logoutController);

export default router;
