import fs from "fs";

class ProductManager {
  #path;

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
    const productsToDelete = await this.getProducts();
    const newProduct = productsToDelete.filter((product) => {
      if (product.id !== productId) return { ...product };
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(newProduct));
    return newProduct;
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

    if (readProducts.find((product) => product.code === code)) {
      return;
    }

    const newProduct = {
      id: readProducts.length,
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

    return newProduct;
  }
}

export default ProductManager;
