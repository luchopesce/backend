import mongoose from "mongoose";
import { options } from "../config/config.js";

class MongooseDB {
  static #instance;
  constructor() {
    mongoose.connect(options.db.url);
  }

  static async getInstance() {
    if (!MongooseDB.#instance) {
      MongooseDB.#instance = new MongooseDB();
      console.log("Conectado a la base de datos");
    }
    return MongooseDB.#instance;
  }
}

export { MongooseDB };
