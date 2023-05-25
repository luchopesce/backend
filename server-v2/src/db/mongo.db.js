import mongoose from "mongoose";
import { options }  from "../config/options.config.js"

class MongooseDB {
  static #instance;
  constructor() {
    mongoose.connect(options.mongo.url);
  }

  static async getInstance() {
    if (!MongooseDB.#instance) {
      MongooseDB.#instance = new MongooseDB();
      console.log("Connect to database successfully");
    }
    return MongooseDB.#instance;
  }
}

export { MongooseDB };
