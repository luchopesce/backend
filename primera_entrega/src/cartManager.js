import fs from "fs";

class CartManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  async getCart() {
    try {
      const cart = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(cart);
    } catch (err) {
      return [];
    }
  }

  async getCartById(cartId) {
    const readCart = await this.getCart();
    const cartExist = readCart.find((cart) => cart.id === cartId);
    return cartExist;
  }

  async addProductToCart(cartId, products = []) {
    const itemsInCart = await this.getCart();

    const newItemInCart = {
      id: cartId,
      products,
    };

    const newCart = [...itemsInCart, newItemInCart];

    await fs.promises.writeFile(this.#path, JSON.stringify(newCart));

    return newItemInCart;
  }

  async updateCart(cartId, productId) {
    const cartToUpdate = await this.getCart();
    const newCart = cartToUpdate.map((cartUpdate) => {
      if (cartUpdate.id === cartId) {
        cartUpdate = {
          ...cartUpdate,
          id: cartId,
          products: { product: productId, quantity: 1 },
        };
      }
      return cartUpdate;
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(newCart));
    const newCartUpdate = await this.getCartById(cartId);
    return newCartUpdate;
  }
}

export default CartManager;
