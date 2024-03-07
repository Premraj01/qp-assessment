import express from "express";
import { createOrder, getAllOrders } from "../controllers/orders.controllers";
import { admin } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").get(admin, getAllOrders).post(createOrder);

export default router;
