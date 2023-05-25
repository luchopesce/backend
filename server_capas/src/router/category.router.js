import { Router } from "express";
import { CategoryController } from "../controller/category.controller.js";


const router = Router();

router.get("/", CategoryController.getCategoriesController);

router.post("/", CategoryController.createCategoryController);


export { router as categoryRouter}