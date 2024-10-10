import mongoose from "mongoose";
import appConfig from "../configs/appConfig.js";

export const connectDB = () => {
	mongoose
		.connect(appConfig.db_url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Connected to database!");
		})
		.catch((err) => {
			console.log("Connection failed!", err);
		});
};


export const isValidObjectId = (id) => {
	return mongoose.Types.ObjectId.isValid(id);
}