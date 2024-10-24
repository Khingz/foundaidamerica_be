import { HttpError } from "../middleware/errors.js";
import { SubscribeService } from "../services/subsribeService.js";
import { sendJsonResponse } from "../utils/sendJsonResponse.js";

const subscribeService = new SubscribeService();

export const subscribe = async (req, res, next) => {
	try {
		const { email } = req.body;
		await subscribeService.subscribe(email);
		sendJsonResponse(res, 201, "Subscribed successfully");
	} catch (error) {
		next(error);
	}
};

export const unsubscribe = async (req, res, next) => {
	try {
		const { email } = req.params;
		await subscribeService.unsubscribe(email);
		sendJsonResponse(res, 200, "Unsubscribed successfully");
	} catch (error) {
		next(error);
	}
};

export const getSubscribers = async (req, res, next) => {
	try {
		const { page = 1, limit = 1000, ...searchQuery } = req.query;
		const response = await subscribeService.getSubscribers({
			page: parseInt(page, 10),
			limit: parseInt(limit, 10),
			searchQuery,
		});
		sendJsonResponse(res, 200, response, "Data fetched successfully");
	} catch (error) {
		next(error);
	}
};

export const deleteSubscriber = async (req, res, next) => {
	try {
        const { email } = req.params;
		if (!email) {
			throw new HttpError(400, "Missing email params");
		}
		await subscribeService.deleteSubscriber(email);
		sendJsonResponse(res, 200, "Data deleted successfully");
	} catch (error) {
        console.log(error);
        
		next(error);
	}
};
