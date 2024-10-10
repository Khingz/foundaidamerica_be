import express from "express";
import {
	deleteSubscriber,
	getSubscribers,
	subscribe,
	unsubscribe,
} from "../controllers/subscribeController.js";
import { subscribeValidationRules, validate } from "../utils/inputValidators.js";

const subscribeRouter = express.Router();

subscribeRouter.post("/subscribe", subscribeValidationRules, validate, subscribe);
subscribeRouter.patch("/unsubscribe/:email", unsubscribe);
subscribeRouter.get("/", getSubscribers);
subscribeRouter.delete("/:email", deleteSubscriber);

export default subscribeRouter;
