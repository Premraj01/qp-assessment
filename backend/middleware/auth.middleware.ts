import { NextFunction } from "express";
import { Request, Response } from "../types/";

const admin = (req: Request, res: Response, next: NextFunction) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an admin");
	}
};

export { admin };
