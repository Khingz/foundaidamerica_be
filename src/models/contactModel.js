import mongoose from "mongoose"
import BaseModel from "./baseModel";


const ContactSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
});

const User = BaseModel.discriminator("Contact", ContactSchema);

export default User;