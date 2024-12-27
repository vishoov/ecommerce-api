import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const signUp = async (req, res) => {
    const {username, email, password, role} = req.body;

    try {
        const emailExists = await User.findOne({ email: email });

        if (emailExists) {
            return res.status(400).json({message: "Email already exists, please login"});
        }

        const user = await User.create({
            email, username, password, role
        });

        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        //security/functionality to hide the token from client or any server side user
        res.cookie("token", token, {expiresIn: "1d"});

        res.status(201).json({user});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error creating user"});
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email) {
        return res.status(400).json({message: "Please enter your email"});
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid Email or Password"});
        }

        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.cookie("token", token, {expiresIn: "1d"});
        res.status(200).json({user, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error during login"});
    }
};

const logout = async (req, res) => {
    res.cookie("token", "", {expires: new Date(0)});
    res.status(200).json({message: "User logged out"});
};

export { signUp, login, logout };
