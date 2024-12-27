import express from "express";
const router = express.Router();

import { signUp, login, logout } from "../controllers/auth.controllers.js";

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);


export default router;