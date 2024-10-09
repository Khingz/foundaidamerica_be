import { AuthService } from "../services/authService.js";
import { sendJsonResponse } from "../utils/sendJsonResponse.js";

const authService = new AuthService();

export const registerUser = async (req, res, next) => {
	try {
		const { fullname, password, username, access_code } = req.body;
		const user = await authService.createUser(
			fullname,
			password,
			username,
			access_code
		);
		return sendJsonResponse(res, 201, user, "User created successfully");
	} catch (error) {
		next(error);
	}
};

export const loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await authService.loginUser(username, password);
		return sendJsonResponse(res, 200, user, "User logged in successfully");
	} catch (error) {
		next(error);
	}
};

export const changePassword = async (req, res, next) => {
	try {
		console.log(req.body);
		
		const { old_password, new_password } = req.body;
		const { username } = req?.user;
		await authService.changePassword(username, old_password, new_password);
		return sendJsonResponse(res, 200, "Password updated successfully");
	} catch (error) {
		next(error);
	}
};
