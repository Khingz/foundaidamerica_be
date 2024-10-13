import mongoose from "mongoose";
import appConfig from "../configs/appConfig.js";
import { HttpError } from "../middleware/errors.js";

export const connectDB = async () => {
	try {
		await mongoose.connect(appConfig.db_url);
		console.log("Connected to database!");
	} catch (err) {
		console.log("Connection failed!", err);
	}
};

export const isValidObjectId = (id) => {
	return mongoose.Types.ObjectId.isValid(id);
};

export const buildQuery = (reqQuery) => {
	const query = {};

	Object.entries(reqQuery).forEach(([key, value]) => {
		if (value !== undefined && value !== "") {
			if (value === "true" || value === "false") {
				query[key] = value === "true";
			} else if (!isNaN(value)) {
				query[key] = parseInt(value, 10);
			} else {
				query[key] = { $regex: value, $options: "i" };
			}
		}
	});
	return query;
};

export const handlePagination = async (
	model,
	{ page, limit, sort = {}, searchQuery } = {}
) => {
	try {
		const pageNumber = Math.max(1, parseInt(page, 10));
		const limitNumber = Math.max(1, parseInt(limit, 10));

		const skip = (pageNumber - 1) * limitNumber;

		const query = buildQuery(searchQuery);

		const totalItems = await model.countDocuments(query);

		const results = await model
			.find(query)
			.sort(sort)
			.skip(skip)
			.limit(limitNumber);

		const totalPages = Math.ceil(totalItems / limitNumber);

		return {
			currentPage: pageNumber,
			totalPages,
			totalItems,
			results,
		};
	} catch (error) {
		throw new HttpError(500, "Internal server error");
	}
};
