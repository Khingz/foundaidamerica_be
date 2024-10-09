import express from "express";
import {
	changePassword,
	loginUser,
	registerUser,
} from "../controllers/authController.js";
import {
	createUserValidationRules,
	loginUserValidationRules,
	validate,
    changePasswordValidationRules
} from "../utils/inputValidators.js";
import { authMiddleware } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", createUserValidationRules, validate, registerUser);
authRouter.post("/login", loginUserValidationRules, validate, loginUser);
authRouter.patch(
	"/change-password",
	authMiddleware,
	changePasswordValidationRules,
	validate,
	changePassword
);

export default authRouter;
