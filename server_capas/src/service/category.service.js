import { CategoryManager } from "../dao/category.dao.js";

const categoryManager = new CategoryManager();

class CategoryService {

    static getAllCategories() {
        return categoryManager.getAll();
    }


    static createCategory(category) {
        return categoryManager.create(category);
    }
}

export { CategoryService}