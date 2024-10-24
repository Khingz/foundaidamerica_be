import { HttpError } from "../middleware/errors.js";
import Subscribe from "../models/subscribeModel.js";
import { handlePagination } from "../utils/dbUtils.js";
import { NotificationService } from "./notificationService.js";
import { getIoInstance } from "../websocket/websocket.js";
import { broadcastNotification } from "../websocket/notificationEvents.js";

const notificatioService = new NotificationService();

export class SubscribeService {
	async subscribe(email) {
		try {
			const isSubscribe = await Subscribe.findOne({ email });
			if (isSubscribe || isSubscribe?.isSubscribe) {
				throw new HttpError(400, "Email already subscribed");
			}
			const newSubscriber = new Subscribe({
				email,
			});
			await newSubscriber.save();
			const notification = await notificatioService.createNotification({
				message: `A new user with email ${email} subscribed`,
			});
			const io = getIoInstance();

			broadcastNotification(io, notification);
			return;
		} catch (error) {
			console.log(error);

			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async unsubscribe(email) {
		try {
			const isSubscribe = await Subscribe.findOne({ email });
			if (!isSubscribe || !isSubscribe?.isSubscribe) {
				throw new HttpError(400, "Email already unsubscribed");
			}
			isSubscribe.isSubscribe = false;
			await isSubscribe.save();
			return;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async getSubscribers({ page, limit, searchQuery }) {
		try {
			const data = await handlePagination(Subscribe, {
				page,
				limit,
				searchQuery,
			});

			return data;
		} catch (error) {
			throw new HttpError(500, "Internal server error");
		}
	}

	async deleteSubscriber(email) {
		try {
			const isSubscribe = await Subscribe.findOne({ email });
			if (!isSubscribe) {
				throw new HttpError(400, "Resource not found");
			}
			await Subscribe.findOneAndDelete({ email });
			return;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}
}
