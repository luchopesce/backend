import fs, { read } from "fs";

class CartManager {
  #path;
  #idNumber = 0

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

  async createCart(){
    const readCart = await this.getCart(); 
    const checkIdExist = readCart.some((cart) => cart.id === this.#idNumber)  
    if(checkIdExist){
      let newId = readCart.map((c) => c.id)
      newId = Math.max(...newId)
      this.#idNumber = newId + 1
    }
    const createCart = {
      id: this.#idNumber,
      products: [],
    };
    const newCart = [...readCart, createCart];
    await fs.promises.writeFile(this.#path, JSON.stringify(newCart));
    return createCart;
  }
  
  async addProductToCart(cartId, productId) {
    const readCart = await this.getCart();
    const addProduct = readCart.map((cart) => {
      if (cart.id === cartId) {
        const cartProducts = cart.products;
        const cartCheckProduct = cartProducts.find(
          (cart) => cart.product === productId
        );
        if (cartCheckProduct) {
          cartCheckProduct.quantity++;
          cart = {
            ...cart,
            id: cartId,
            products: [...cartProducts],
          };
        } else {
          cart = {
            ...cart,
            id: cartId,
            products: [...cartProducts, { product: productId, quantity: 1 }],
          };
        }
      }
      return cart;
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(addProduct));
    const getNewCart = await this.getCartById(cartId);
    return getNewCart;
  }
}

export default CartManager;
