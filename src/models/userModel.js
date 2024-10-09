import mongoose from "mongoose";
import BaseModel from "./baseModel.js";

const UserSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = BaseModel.discriminator("User", UserSchema);

export default User;
