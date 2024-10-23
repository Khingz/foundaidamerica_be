import { Server } from "socket.io";
import { verifyToken } from "../utils/auth.js";
import appConfig from "../configs/appConfig.js";
import { handleNotificationEvents } from "./notificationEvents.js";

let ioInstance = null;

// This function will initialize the WebSocket server
export const initWebSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: appConfig.clientUrl,
			methods: ["GET", "POST"],
			allowedHeaders: ["Authorization"],
			credentials: true,
		},
	});

	io.use(async (socket, next) => {
		const token = socket.handshake.query.token;
		if (!token) {
			return next(new Error("Authentication error: No token"));
		}
		const verified = await verifyToken(token);
		if (verified) {
			socket.user = verified;
			return next();
		} else {
			return next(new Error("Authentication error: Invalid token"));
		}
	});

	io.on("connection", (socket) => {
		console.log("A new client connected:", socket.id);

		handleNotificationEvents(io, socket)

		socket.on("disconnect", () => {
			console.log("disconnected");
		});
	});

	ioInstance = io;

	return io;
};

export const getIoInstance = () => {
	if (!ioInstance) {
		throw new Error("Socket.io instance is not initialized");
	}
	return ioInstance;
};
