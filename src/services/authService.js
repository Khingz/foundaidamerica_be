import appConfig from "../configs/appConfig.js";
import { HttpError } from "../middleware/errors.js";
import User from "../models/userModel.js";
import { comparePassword, generateToken, hashPassword } from "../utils/auth.js";

export class AuthService {
	async createUser(fullname, password, username, access_code) {
		try {
			if (access_code !== appConfig.accessCode) {
				throw new HttpError(400, "Invalid access code");
			}

			const userExist = await User.findOne({ username });
			if (userExist) {
				throw new HttpError(400, "User already exists");
			}

			const hashedPassword = await hashPassword(password);
			const newUser = new User({
				fullname,
				username,
				password: hashedPassword,
			});
			await newUser.save();
			const userObject = newUser.toObject();
			delete userObject.password;
			return userObject;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async loginUser(username, password) {
		try {
			const regex = new RegExp(username, "i"); // case insensitivity
			const user = await User.findOne({ username: regex });
			if (!user) {
				throw new HttpError(404, "Invalid email or password");
			}
			const isValidPassword = await comparePassword(password, user.password);
			if (!isValidPassword) {
				throw new HttpError(404, "Invalid email or password");
			}
			const accessToken = await generateToken(user.username);
			const userObject = user.toObject();
			delete userObject.password;
			return {
				access_token: accessToken,
				user: userObject,
			};
		} catch (error) {
			console.log(error);

			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async changePassword(username, old_password, new_password) {
		try {
			const user = await User.findOne({ username });
			if (!user) {
				throw new HttpError(404, "User not found");
			}
			const isValidPassword = await comparePassword(
				old_password,
				user.password
			);
			if (!isValidPassword) {
				throw new HttpError(400, "Your old password is incorrect");
			}
			if (old_password === new_password) {
				throw new HttpError(400, "New password must be different");
			}
			const hashedPassword = await hashPassword(new_password);
			user.password = hashedPassword;
			await user.save();
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}
}
