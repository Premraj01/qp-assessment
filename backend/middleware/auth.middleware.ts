import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "../types/";
import { User } from "../models";

const admin = async (req: Request, res: Response, next: NextFunction) => {
	let token: string;
	try {
		token = req.headers.authorization.split(" ")[1];
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded.id).select("-password");
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(401).send({
				message: "Not authorized as an admin",
			});
		}
	} catch (error) {
		res.status(401);
		throw new Error("Not authorized, token failed");
	}
};

export { admin };
