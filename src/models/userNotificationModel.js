import mongoose from "mongoose";

const userNotificationSchema = new mongoose.Schema({
	notification: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Notification",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	isRead: {
		type: Boolean,
		default: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	receivedAt: {
		type: Date,
		default: Date.now,
	},
});

const UserNotification = mongoose.model("UserNotification", userNotificationSchema);

export default UserNotification;
