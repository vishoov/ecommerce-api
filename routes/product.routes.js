import express from "express";
const router = express.Router();
import { deleteProduct, getById, getProducts, postProducts, updateProduct } from "../controllers/product.controllers.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
router.get("/", getProducts);

router.post("/", authenticateUser, postProducts);

router.get("/:id", getById);

router.patch("/:id", authenticateUser, updateProduct);

router.delete("/:id", authenticateUser,deleteProduct);

export default router;
