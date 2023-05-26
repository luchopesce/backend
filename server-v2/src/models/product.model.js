import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },    
    stock: {
        type: Number,
        required: true,
        index: true,
    },   
    category: {
        type: String,
        required: true
    },    
    thumbnail: {
        type: Array,
        default: []
    } 
})

productsSchema.plugin(mongoosePaginate)

const productModel = mongoose.model("products", productsSchema)
export default productModel