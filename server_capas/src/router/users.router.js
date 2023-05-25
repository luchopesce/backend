import { Router } from "express";
import { getUsersController } from "../controller/users.controller.js";

const router = Router();

router.get("/", getUsersController);

export { router as usersRouter };
