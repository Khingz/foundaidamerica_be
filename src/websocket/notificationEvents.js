export const broadcastNotification = (io, message) => {
	io.emit("newNotification", { message });
};
