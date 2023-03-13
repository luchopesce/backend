import fs from "fs";

class ProductManager {
  #path;
  #idNumber = 0;

  constructor(path) {
    this.#path = path;
  }

  async getProducts() {
    try {
      const product = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(product);
    } catch (err) {
      return [];
    }
  }

  async getProductById(productId) {
    const readProducts = await this.getProducts();
    const productoExist = readProducts.find(
      (product) => product.id === productId
    );
    return productoExist;
  }

  async updateProduct(productId, item) {
    const productsToUpdate = await this.getProducts();
    const newProduct = productsToUpdate.map((productUpdate) => {
      if (productUpdate.id === productId) {
        productUpdate = { ...productUpdate, ...item, id: productId };
      }
      return productUpdate;
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(newProduct));
    const newProductUpdate = await this.getProductById(productId);
    return newProductUpdate;
  }

  async deleteProduct(productId) {
    let productsToDelete = await this.getProducts();
    productsToDelete = productsToDelete.filter(
      (product) => product.id !== productId
    );
    await fs.promises.writeFile(this.#path, JSON.stringify(productsToDelete));
    return productsToDelete;
  }

  async addProduct({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail = [],
  }) {
    const readProducts = await this.getProducts();
    const checkCodeExist = readProducts.some(
      (product) => product.code === code
    );
    const checkIdExist = readProducts.some(
      (products) => products.id === this.#idNumber
    );

    if (checkCodeExist) {
      return;
    }

    if (checkIdExist) {
      let newId = readProducts.map((c) => c.id);
      newId = Math.max(...newId);
      this.#idNumber = newId + 1;
    }

    const newProduct = {
      id: this.#idNumber,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnail,
    };

    const updateProducts = [...readProducts, newProduct];

    await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts));

    return updateProducts;
  }
}

export default ProductManager;
