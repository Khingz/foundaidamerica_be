import appConfig from "../configs/appConfig.js";
import { HttpError } from "../middleware/errors.js";
import Contact from "../models/contactUsModel.js";
import { isValidObjectId } from "../utils/connectdB.js";

export class ContactUsService {
	async createContactUs(fullname, email, message) {
		try {
			const newContact = new Contact({
				fullname,
				email,
				message,
			});
			await newContact.save();
			return newContact;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async getAllContactUs() {
		try {
			const data = await Contact.find();
			return data;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async getContactUsById(id) {
		try {
			if (!isValidObjectId(id)) {
				throw new HttpError(400, "Invalid id");
			}
			const data = await Contact.findById(id);
			if (!data) {
				throw new HttpError(404, "Resource not found");
			}
			return data;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}

	async deleteContactUs(id) {
		try {
			if (!isValidObjectId(id)) {
				throw new HttpError(400, "Invalid id");
			}
			const data = await Contact.findById(id);
			if (!data) {
				throw new HttpError(404, "Resource not found");
			}
			await Contact.findByIdAndDelete(id);
			return;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new HttpError(500, "Internal server error");
		}
	}
}
