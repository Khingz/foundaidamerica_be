import User from "../models/userModel.js";
import { verifyToken } from "../utils/auth.js";

export const authMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				status_code: "401",
				message: "Invalid token",
			});
		}
		const token = authHeader.split(" ")[1];
		if (!token) {
			return res.status(401).json({
				status_code: "401",
				message: "Invalid token",
			});
		}
		const payload = await verifyToken(token);
		const user = await User.findOne({ username: payload.username });
		if (!user) {
			return res.status(401).json({
				status_code: "401",
				message: "Invalid token",
			});
		}
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		
		next(error);
	}
};
