import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getUserNotifications } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.get("/", authMiddleware, getUserNotifications);

export default notificationRouter;
