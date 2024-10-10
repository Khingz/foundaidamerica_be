import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
        isSubscribe: {
			type: Boolean,
			default: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Subscribe = mongoose.model("Subscribe", SubscribeSchema);

export default Subscribe;
