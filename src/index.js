import express from "express";
import appConfig from "./configs/appConfig.js";
import authRouter from "./routes/authRoute.js";
import { errorHandler, routeNotFound } from "./middleware/errors.js";
import { connectDB } from "./utils/dbUtils.js";
import contactRouter from "./routes/contactUsRoute.js";
import subscribeRouter from "./routes/subscribeRoute.js";
import volunteerRouter from "./routes/volunteerRoute.js";
import cron from "node-cron";
import axios from "axios";

const port = appConfig.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.json({ msg: "This is the Foundaid America BE API" });
});

app.use("/api/auth", authRouter);
app.use("/api/contact-us", contactRouter);
app.use("/api/subscribers", subscribeRouter);
app.use("/api/volunteers", volunteerRouter);

// Schedule the cron job to ping the server every 5 minutes
cron.schedule("*/5 * * * *", async () => {
	try {
		console.log("Pinging the server to prevent sleep...");
		await axios.get(appConfig.serverUrl);
	} catch (err) {
		console.error("Error pinging the server:", err.message);
	}
});

app.use(routeNotFound);
app.use(errorHandler);

const startServer = async () => {
	await connectDB();
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
};

startServer();
