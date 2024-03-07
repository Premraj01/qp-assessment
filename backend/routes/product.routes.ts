import express from "express";
import {
	addProduct,
	deleteProductById,
	getAllProducts,
	updateProduct,
} from "../controllers/products.controllers";
import { admin } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").get(getAllProducts).post(admin, addProduct);
router.route("/:id").delete(admin, deleteProductById).put(admin, updateProduct);

export default router;
