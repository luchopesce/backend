import productModel from "../models/product.model.js";

export class ProductManager {
  constructor() {
    console.log("Working with products using dbsystem");
  }

  static getProducts = async () => {
    const products = await productModel.find().lean();
    return products;
  };

  static getProductById = async (id) => {
    const product = await productModel.findOne({ _id: id });
    return product;
  };

  static deleteProduct = async (id) => {
    const deleteProduct = await productModel.findByIdAndDelete({ _id: id });
    return deleteProduct;
  };

  static updateProduct = async (id, obj) => {
    const updateUser = await productModel.findOneAndUpdate({ _id: id }, obj, {
      new: true,
    });
    return updateUser;
  };

  static createProduct = async (objProduct) => {
    const newProduct = await productModel.create(objProduct);
    return newProduct;
  };

  static paginateProducts = async (query, options) => {
    if(!options){
      options = options = {
        lean: true,
        limit: 2,
        sort: { price: "asc" },
      };
    }
    const paginate = await productModel.paginate(query, options);
    return paginate;
  };

}
