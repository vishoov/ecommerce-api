import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:{
            validator:validator.isEmail,
            message:"Please enter a valid email"
        }
        // regex

    },
    password:{
        type:String,
        required: true
    },
    role:{
        type: String,
        enum:["admin", "user"],
        default: "user"
    }
    
}, { timestamps:true });

userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.compare= async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema);

export default User;