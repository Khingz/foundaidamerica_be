import mongoose from "mongoose";
const { Schema } = mongoose;

const BaseModelSchema = new Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		discriminatorKey: "type",
	}
);

const BaseModel = mongoose.model("BaseModel", BaseModelSchema);

export default BaseModel;
