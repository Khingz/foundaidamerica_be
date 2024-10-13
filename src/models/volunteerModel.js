import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
	{
        fullname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
        address: {
			type: String,
			required: true,
		},
        city: {
			type: String,
			required: true,
		},
        state: {
			type: String,
			required: true,
		},
        phone_number: {
            type: String,
            required: true,
        },
        instagram: {
			type: String,
			required: false,
		},
        twitter: {
			type: String,
			required: false,
		},
        facebook: {
			type: String,
			required: false,
		},
        occupation: {
			type: String,
			required: false,
		},
        volunteer_reason: {
			type: String,
			required: true,
		},
        date_of_birth: {
            type: Date,
            required: true
        },
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

export default Volunteer;
