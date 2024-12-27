import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
const app = express();
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";



app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "*",
    
}));

app.get("/", (req, res) => {
    res.send("<h1> Welcome to the E-Commerce API by AccioJob</h1><br><p>This is a RESTful API built with node.js</p>");
});


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err);
    }
};



connectDB();
app.listen(3030, () => {
    try{
        console.log("Server is running on port 3030");
    }
    catch(err){
        console.log(err);
    }
});