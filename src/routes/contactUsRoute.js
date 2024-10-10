import express from "express";
import {
	addContactUs,
	deleteContactUs,
	getAllContactUs,
	getContactUsById,
} from "../controllers/contactUsController.js";
import { createContactUsRules, validate } from "../utils/inputValidators.js";

const contactRouter = express.Router();

contactRouter.post("/", createContactUsRules, validate, addContactUs);
contactRouter.get("/", getAllContactUs);
contactRouter.get("/:id", getContactUsById);
contactRouter.delete("/:id", deleteContactUs);

export default contactRouter;
