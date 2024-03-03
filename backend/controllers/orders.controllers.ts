import { Order, Product } from "../models";
import { OrderItems } from "../types";
import { Request, Response } from "../types/application.type";
import asyncHandler from "express-async-handler";
import { updateProduct, updateProductQuery } from "./products.controllers";

const createOrder = asyncHandler(async (req: Request, res: Response) => {
	let orderItems = req.body;

	let order = new Order({
		orderItems: [...orderItems],
		subTotal: orderItems.reduce(
			(acc: number, cur: OrderItems) => acc + cur.price * cur.qty,
			0,
		),
	});

	const createdOrder = await order.save();
	if (createdOrder) {
		order.orderItems.forEach(async (orderItem: OrderItems) => {
			const product = await Product.findById(orderItem.product);
			product.stock = product.stock - orderItem.qty;
			updateProductQuery(product);
		});
		res.status(200).send("Order added!");
	} else {
		res.status(400);
		throw new Error("Something went wrong!");
	}
});

const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
	const orders = await Order.find();
	if (orders) {
		res.status(200).send(orders);
	} else {
		res.status(400);
		throw new Error("Something went wrong!");
	}
});

export { createOrder, getAllOrders };
