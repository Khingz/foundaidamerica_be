import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const formattedErrors = errors.array().map((err) => ({ msg: err.msg }));
	return res.status(422).json({ errors: formattedErrors });
};

const createUserValidationRules = [
	body("access_code")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Access code is required"),
	body("fullname")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Fullname is required"),
	body("username")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Username is required"),
	body("password")
		.isString()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

const loginUserValidationRules = [
	body("username")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Username is required"),
	body("password")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Password is required"),
];

const changePasswordValidationRules = [
	body("old_password")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Old password is required"),
	body("new_password")
		.isString()
		.isLength({ min: 1 })
		.withMessage("New password is required"),
];

const createContactUsRules = [
	body("fullname")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Fullname is required"),
	body("email")
		.isEmail()
		.withMessage("Please enter a valid email"),
	body("message")
		.isString()
		.withMessage("Enter your message")
		.isLength({ min: 10 })
		.withMessage("Your message is too short"),
];

const subscribeValidationRules = [
	body("email")
		.isEmail()
		.withMessage("Please enter a valid email"),
];

const createVolunteerValidationRules = [
	body("fullname")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Fullname is required"),
	body("email").isEmail().withMessage("Please enter a valid email"),

	body("address")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Address is required"),
	body("city").isString().isLength({ min: 1 }).withMessage("City is required"),
	body("state")
		.isString()
		.isLength({ min: 1 })
		.withMessage("State is required"),
	body("country")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Country is required"),
	body("phone_number")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Phone number is required"),
	body("occupation")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Occupation is required"),
	body("twitter").optional(),
	body("facebook").optional(),
	body("instagram").optional(),
	body("date_of_birth").optional(),
	body("volunteer_reason")
		.isString()
		.isLength({ min: 1 })
		.withMessage("Volunteer reason is required"),
];

export {
	createUserValidationRules,
	validate,
	loginUserValidationRules,
	changePasswordValidationRules,
	createContactUsRules,
	subscribeValidationRules,
	createVolunteerValidationRules,
};
