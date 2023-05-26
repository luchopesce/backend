import { ProductManager } from "./product.dao.js";
import cartModel from "../models/cart.model.js";

export class CartManager {
  constructor() {
    console.log("Working with cart using dbsystem");
  }

  getCarts = async () => {
    const carts = await cartModel.find().lean();
    return carts;
  };

  getCartById = async (id) => {
    const cart = await cartModel.findOne({ _id: id });
    return cart;
  };

  deleteCart = async (id) => {
    const deleteCart = await cartModel.findByIdAndDelete({ _id: id });
    return deleteCart;
  };

  createCart = async () => {
    const newCart = await cartModel.create({});
    return newCart;
  };

  updateProductQuantity = async (cartId, prodId, reqQuantity) => {
    const cart = await this.getCartById(cartId);
    const product = await ProductManager.getProductById(prodId);
    if (cart && product && reqQuantity.hasOwnProperty("quantity")) {
      let updateQuantity;
      const existProductInCart = cart.products.some(
        (thisCart) => thisCart.product._id == prodId
      );
      if (existProductInCart) {
        updateQuantity = cart.products.map((thisCartMap) => {
          if (thisCartMap.product != undefined) {
            if (thisCartMap.product._id == prodId) {
              return {
                ...thisCartMap,
                ...reqQuantity,
              };
            }
          }
          return thisCartMap;
        });
      } else {
        return;
      }

      cart.products = updateQuantity;
      return cart.save();
    } else {
      return;
    }
  };

  deleteProductInCart = async (cartId, prodId) => {
    const cart = await this.getCartById(cartId);
    const product = await ProductManager.getProductById(prodId);
    if (cart && product) {
      let updateCart;
      const existProductInCart = cart.products.some(
        (thisCart) => thisCart.product._id == prodId
      );
      if (existProductInCart) {
        updateCart = cart.products.filter((thisCartFilter) => {
          if (thisCartFilter.product != undefined) {
            return thisCartFilter.product._id != prodId;
          }
        });
      } else {
        return;
      }
      cart.products = updateCart;
      return cart.save();
    } else {
      return;
    }
  };

  addProductToCart = async (cartId, prodId, obj) => {
    const cart = await this.getCartById(cartId);
    const product = await ProductManager.getProductById(prodId);
    if (cart && product) {
      let addProduct;
      const existProductInCart = cart.products.some(
        (thisCart) => thisCart.product._id == prodId
      );
      if (existProductInCart) {
        addProduct = cart.products.map((thisCartMap) => {
          if (thisCartMap.product != undefined) {
            if (thisCartMap.product._id == prodId) {
              return {
                ...thisCartMap,
                quantity: thisCartMap.quantity + 1,
              };
            }
          }

          return thisCartMap;
        });
      } else {
        addProduct = [...cart.products, { product: prodId, quantity: 1 }];
      }
      cart.products = addProduct;
      return cart.save();
    } else if (cart && obj) {
      let addProduct = [...cart.products, { insertProduct: obj, quantity: 1 }];
      cart.products = addProduct;
      return cart.save();
    } else {
      return;
    }
  };
}
