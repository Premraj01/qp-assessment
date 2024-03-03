import { Model, Document } from "mongoose";

export interface Product {
	name: string;
	price: number;
	stock: number;
	minimumStock: number;
}

export interface ProductDocument extends Product, Document {}

export interface ProductModel extends Model<ProductDocument> {}
