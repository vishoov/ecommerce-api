import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      
    }
}, { timestamps:true });

//connecting the reviews with the products

const Product = mongoose.model("Product", productSchema);


export default Product;