import express from "express";
import { authUser, registerUser } from "../controllers/users.controllers";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);

export default router;
