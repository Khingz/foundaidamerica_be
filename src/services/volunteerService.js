import { HttpError } from "../middleware/errors.js";
import Volunteer from "../models/volunteerModel.js";
import { handlePagination, isValidObjectId } from "../utils/dbUtils.js";

export class VolunteerService {
	async addVolunteer(
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
	) {
		try {
			const isVolunteerExist = await Volunteer.findOne({ email });
			if (isVolunteerExist) {
				throw new HttpError(409, "Volunteer already exist");
			}
			const volunteer = new Volunteer({
				fullname,
				email,
				phone_number,
				address,
				city,
				state,
				twitter,
				facebook,
				instagram,
				date_of_birth: new Date(date_of_birth),
				volunteer_reason,
			});
			await volunteer.save();

			return volunteer;
		} catch (error) {
			console.log(error);

			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async getVolunteers({ page, limit, searchQuery }) {
		try {
			const data = await handlePagination(Volunteer, {
				page,
				limit,
				searchQuery,
			});
			return data;
		} catch (error) {
			console.log(error);

			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async getVolunteer(id) {
		try {
			if (!isValidObjectId(id)) {
				throw new HttpError(400, "Invalid id");
			}
			const volunteer = await Volunteer.findById(id);
			if (!volunteer) {
				throw new HttpError(404, "Volunteer not found");
			}
			return volunteer;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async deleteVolunteer(id) {
		try {
			if (!isValidObjectId(id)) {
				throw new HttpError(400, "Invalid id");
			}
			const volunteer = await Volunteer.findById(id);
			if (!volunteer) {
				throw new HttpError(404, "Volunteer not found");
			}
			await Volunteer.findByIdAndDelete(id);
			return;
		} catch (error) {
            console.log(error);
            
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}
}
