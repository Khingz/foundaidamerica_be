import express from "express";
import {
	addVolunteer,
	deleteVolunteer,
	getVolunteer,
	getVolunteers,
} from "../controllers/volunteerController.js";
import {
	createVolunteerValidationRules,
	validate,
} from "../utils/inputValidators.js";

const volunteerRouter = express.Router();

volunteerRouter.get("/", getVolunteers);
volunteerRouter.get("/:id", getVolunteer);
volunteerRouter.post(
	"/",
	createVolunteerValidationRules,
	validate,
	addVolunteer
);
volunteerRouter.delete("/:id", deleteVolunteer);

export default volunteerRouter;
