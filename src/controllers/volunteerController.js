import { VolunteerService } from "../services/volunteerService.js";
import { sendJsonResponse } from "../utils/sendJsonResponse.js";

const volunteerService = new VolunteerService();

export const getVolunteers = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, ...searchQuery } = req.query;
		const response = await volunteerService.getVolunteers({
			page: parseInt(page, 10),
			limit: parseInt(limit, 10),
			searchQuery,
		});
		sendJsonResponse(res, 200, response, "Data fetched successfully");
	} catch (error) {
		next(error);
	}
};

export const getVolunteer = async (req, res, next) => {
	try {
        const {id} = req.params;
        const response = await volunteerService.getVolunteer(id);
        sendJsonResponse(res, 200, response, "Data fetched successfully");
	} catch (error) {
		next(error);
	}
};

export const addVolunteer = async (req, res, next) => {
	try {
		const {
			fullname,
			email,
			phone_number,
			address,
			city,
			state,
			twitter,
			facebook,
			instagram,
			date_of_birth,
			volunteer_reason,
		} = req.body;

		const response = await volunteerService.addVolunteer(
			fullname,
			email,
			phone_number,
			address,
			city,
			state,
			twitter,
			facebook,
			instagram,
			date_of_birth,
			volunteer_reason
		);
		sendJsonResponse(res, 201, response, "Volunteer added successfully");
	} catch (error) {
		next(error);
	}
};

export const deleteVolunteer = async (req, res, next) => {
	try {
        const { id } = req.params;
        const response = await volunteerService.deleteVolunteer(id);
        sendJsonResponse(res, 200, response, "Volunteer deleted successfully");
	} catch (error) {
		next(error);
	}
};
