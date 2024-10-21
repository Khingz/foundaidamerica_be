import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import appConfig from "../configs/appConfig.js";

export const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (username) => {
	return jwt.sign({ username }, appConfig.tokenSecret, { expiresIn: "1d" });
};

export const verifyToken = async (token) => {
	try {
		const payload = await jwt.verify(token, appConfig.tokenSecret);
		return payload;
	} catch (error) {
		return false;
	}
};
