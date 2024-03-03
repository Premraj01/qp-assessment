import { model, Schema } from "mongoose";
import { OrderDocument } from "../types/";

const orderSchema = new Schema(
	{
		orderItems: [
			{
				name: {
					type: String,
					required: true,
				},
				qty: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				product: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
			},
		],
		subTotal: {
			type: Number,
			required: true,
			default: 0.0,
		},
	},
	{
		timestamps: true,
	},
);

export const Order = model<OrderDocument>("Order", orderSchema);
