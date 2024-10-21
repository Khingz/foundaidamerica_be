import { HttpError } from "../middleware/errors.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import UserNotification from "../models/userNotificationModel.js";
import { generateUserNotification } from "../utils/dbUtils.js";

export class NotificationService {
	async createNotification({ message }) {
		try {
			if (!message) {
				throw new HttpError(400, "Message is missing");
			}
			const newNotification = new Notification({
				message,
			});
			await newNotification.save();
			const admins = await User.find();
			const notifications = generateUserNotification(admins, newNotification);
			await UserNotification.insertMany(notifications);
			return newNotification;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async getNotifications({ page, limit, query }) {
		try {
			const pageNumber = Math.max(1, parseInt(page, 10));
			const limitNumber = Math.max(1, parseInt(limit, 10));
			const skip = (pageNumber - 1) * limitNumber;

			const totalItems = await UserNotification.countDocuments(query);
			const unreadCount = await UserNotification.countDocuments({
				user: query.user,
				isRead: false,
			});

			const notifications = await UserNotification.find(query)
				.populate("notification")
				.sort({ receivedAt: -1 })
				.skip(skip)
				.limit(limitNumber);

			const totalPages = Math.ceil(totalItems / limitNumber);

			return {
				currentPage: pageNumber,
				totalPages,
				totalItems,
				unreadCount,
				data: notifications,
			};
		} catch (error) {
			console.log(error);

			throw new HttpError(500, "Internal server error");
		}
	}
}
