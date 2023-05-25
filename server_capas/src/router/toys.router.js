import { Router } from "express";
import { getToysController, createToyController } from "../controller/toys.controller.js";

const router = Router();

router.get("/", getToysController);

router.post("/", createToyController);

export { router as toysRouter };
