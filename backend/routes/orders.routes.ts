import express from "express";
import { createOrder, getAllOrders } from "../controllers/orders.controllers";

const router = express.Router();

router.route("/").get(getAllOrders).post(createOrder);

export default router;
