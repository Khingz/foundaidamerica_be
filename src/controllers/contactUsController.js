import { HttpError } from "../middleware/errors.js";
import { ContactUsService } from "../services/contactUsService.js";
import { sendJsonResponse } from "../utils/sendJsonResponse.js";

const contactUsService = new ContactUsService();

export const addContactUs = async (req, res, next) => {
	try {
		const { fullname, email, message } = req.body;
		const response = await contactUsService.createContactUs(
			fullname,
			email,
			message
		);
		sendJsonResponse(res, 201, response, "Contact message added successfully");
	} catch (error) {
		next(error);
	}
};

export const getAllContactUs = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, ...searchQuery } = req.query;
		const response = await contactUsService.getAllContactUs({
			page: parseInt(page, 10),
			limit: parseInt(limit, 10),
			searchQuery,
		});
		sendJsonResponse(res, 200, response, "Data fetched successfully");
	} catch (error) {
		next(error);
	}
};

export const getContactUsById = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			throw HttpError(400, "Please pass an contact us id");
		}
		const response = await contactUsService.getContactUsById(id);
		sendJsonResponse(res, 200, response, "Data fetched successfully");
	} catch (error) {
		next(error);
	}
};

export const deleteContactUs = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			throw HttpError(400, "Please pass an contact us id");
		}
		await contactUsService.deleteContactUs(id);
		sendJsonResponse(res, 200, "Data deleted successfully");
	} catch (error) {
		next(error);
	}
};
