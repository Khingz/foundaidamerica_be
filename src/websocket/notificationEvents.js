import UserNotification from "../models/userNotificationModel.js";

export const broadcastNotification = (io, message) => {
	io.emit("newNotification", { message });
};

export const handleNotificationEvents = (io, socket) => {
	socket.on("markAsRead", async (notificationId, userId, callback) => {
		try {
			const result = await UserNotification.updateOne(
				{ notification: notificationId, user: userId },
				{ isRead: true }
			);
			if (result.modifiedCount > 0) {
				callback({ success: true, message: "Notification marked as read" });
			} else {
				callback({
					success: false,
					message: "Notification was already marked as read or not found",
				});
			}
		} catch (error) {
			callback({
				success: false,
				message: "An error occurred while marking notification as read",
			});
		}
	});
	socket.on("deleteNotification", async (notificationId, userId, callback) => {
		try {
			const result = await UserNotification.deleteOne({
				notification: notificationId,
				user: userId,
			});

			if (result.deletedCount > 0) {
				callback({ success: true, message: "Notification deleted" });
			} else {
				callback({
					success: false,
					message: "Notification not found or already deleted",
				});
			}
		} catch (error) {
			callback({
				success: false,
				message: "An error occurred while deleting notification",
			});
		}
	});
	socket.on("markAllAsRead", async (userId, callback) => {
		console.log("Marking all notifications as read for user:", userId);
		
		try {
			const result = await UserNotification.updateMany(
				{ user: userId, isRead: false },
				{ $set: { isRead: true } }
			);
			console.log(result);
			
			socket.emit("allNotificationsMarkedAsUnread");
		} catch (error) {
			console.error("Error marking all notifications as unread:", error);
			socket.emit("error", "Unable to mark all notifications as unread.");
		}
	});
};
