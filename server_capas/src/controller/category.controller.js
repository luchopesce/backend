import { CategoryService } from "../service/category.service.js";

class CategoryController {
  static getCategoriesController(req, res) {
    const result = CategoryService.getAllCategories();
    res.status(200).json({ statuss: "success", payload: result });
  }

  static createCategoryController(req, res) {
    const result = CategoryService.createCategory(req.body);
    res.status(201).json({ statuss: "success", payload: result });
  }
}

export {CategoryController}
