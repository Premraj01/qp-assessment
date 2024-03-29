import { Model, Document } from "mongoose";
import { ProductDocument } from "./product.type";

export interface OrderItems {
	name: string;
	qty: number;
	price: number;
	product: ProductDocument;
}

export interface Order {
	orderItems: OrderItems[];
	subTotal: number;
}

export interface OrderDocument extends Order, Document {}

export interface OrderModel extends Model<OrderDocument> {}
