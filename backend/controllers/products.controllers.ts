import { Request, Response } from "../types/";
import asyncHandler from "express-async-handler";
import { Product } from "../models";

/**
 * Add Product
 * @route POST /api/products
 * @access Private to ADMIN
 */
const addProduct = asyncHandler(async (req: Request, res: Response) => {
	let product = new Product({
		name: req.body.name,
		price: req.body.price,
		stock: req.body.stock,
		minimumStock: req.body.minimumStock,
	});

	const createdProduct = await product.save();
	if (createdProduct) {
		res.status(200).send("Product added!");
	} else {
		res.status(400);
		throw new Error("Something went wrong!");
	}
});

/**
 * List of all products
 * @route GET /api/products
 * @access Public
 */
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
	const products = await Product.find();

	if (products) {
		res.status(200).send(products);
	} else {
		res.status(400);
		throw new Error("Something went wrong!");
	}
});

/**
 * Delete Product
 * @route DELETE /api/products/:id
 * @access Private to ADMIN
 */
const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.deleteOne();
		res.json({ message: "Product removed" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

/**
 * Delete Product
 * @route PATCH /api/products/:id
 * @access Private to ADMIN
 */
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const { name, price, stock } = req.body as {
		name: string;
		price: number;
		stock: number;
	};

	const product = await Product.findById(id);
	if (product) {
		product.name = name;
		product.price = price;
		product.stock = stock;

		const updatedProduct = updateProductQuery(product);
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found.");
	}
});

const updateProductQuery = async (product: any) => {
	return await product.save();
};

export {
	addProduct,
	getAllProducts,
	deleteProductById,
	updateProduct,
	updateProductQuery,
};
