import { NotificationService } from "../services/notificationService.js";
import { sendJsonResponse } from "../utils/sendJsonResponse.js";

const notificationService = new NotificationService();

export const getUserNotifications = async (req, res, next) => {
	try {
		const { page = 1, limit = 20 } = req.query;
        const query = {
            user: req.user._id,
            isDeleted: false
        }
		const response = await notificationService.getNotifications({
			page,
			limit,
            query
		});
		sendJsonResponse(res, 200, response, "Data fetched successfully");
	} catch (error) {
		next(error);
	}
};
