import mongoose from "mongoose";
import { cartCollection } from "./cart.model.js";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart:{
    type: mongoose.Schema.Types.ObjectId,
    ref: cartCollection
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user"
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
