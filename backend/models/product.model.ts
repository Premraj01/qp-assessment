import { model, Schema } from "mongoose";
import { ProductDocument } from "../types/";

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		stock: {
			type: Number,
			required: true,
			default: 0,
		},
		minimumStock: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

export const Product = model<ProductDocument>("Product", productSchema);
