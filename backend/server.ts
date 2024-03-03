import express, { Request, Response } from "express";
import productsRoutes from "./routes/product.routes";
import ordersRoutes from "./routes/orders.routes";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("API IS RUNNING...");
});

app.use("/api/product/", productsRoutes);
app.use("/api/orders/", ordersRoutes);

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
