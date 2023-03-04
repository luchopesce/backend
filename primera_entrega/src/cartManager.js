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
    const existCart = readCart.find((cart) => cart.id === cartId);
    return existCart;
  }

  async addProductToCart(cartId, productId) {
    const itemsInCart = await this.getCart();
    const newItemInCart = {
      id: cartId,
      products: [
        {
          product: productId,
          quantity: 1,
        },
      ],
    };
    const newCart = [...itemsInCart, newItemInCart];
    await fs.promises.writeFile(this.#path, JSON.stringify(newCart));
    return newItemInCart;
  }

  async updateCart(cartId, productId) {
    const cartToUpdate = await this.getCart();
    const newCart = cartToUpdate.map((cartUpdate) => {
      if (cartUpdate.id === cartId) {
        const cartProducts = cartUpdate.products;
        const cartCheckProduct = cartProducts.find(
          (cart) => cart.product === productId
        );
        if (cartCheckProduct) {
          cartCheckProduct.quantity++;
          cartUpdate = {
            ...cartUpdate,
            id: cartId,
            products: [...cartProducts],
          };
        } else {
          cartUpdate = {
            ...cartUpdate,
            id: cartId,
            products: [...cartProducts, { product: productId, quantity: 1 }],
          };
        }
      }
      return cartUpdate;
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(newCart));
    const newCartUpdate = await this.getCartById(cartId);
    return newCartUpdate;
  }
}

export default CartManager;
