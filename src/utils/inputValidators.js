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
	body("access_code").isString().withMessage("Access code is required"),
	body("fullname").isString().withMessage("Fullname is required"),
	body("username").isString().withMessage("Email is required"),
	body("password")
		.isString()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

const loginUserValidationRules = [
	body("username").isString().withMessage("Email is required"),
	body("password").isString().withMessage("Password is required"),
];

const changePasswordValidationRules = [
	body("old_password").isString().withMessage("Old password is required"),
	body("new_password").isString().withMessage("New password is required"),
];

const createContactUsRules = [
	body("fullname").isString().withMessage("Fullname is required"),
	body("email").isEmail().withMessage("Please enter a valid email"),
	body("message")
		.isString()
		.withMessage("Enter your message")
		.isLength({ min: 10 })
		.withMessage("Your message is too short"),
];

export {
	createUserValidationRules,
	validate,
	loginUserValidationRules,
	changePasswordValidationRules,
	createContactUsRules,
};
