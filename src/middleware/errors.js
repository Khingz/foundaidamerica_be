class HttpError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
	}
}

const routeNotFound = (req, res, next) => {
	const message = `Route not found: ${req.originalUrl}`;
	res.status(404).json({ success: "unsuccessful", status_code: 404, message });
};

const errorHandler = (error, req, res, next) => {
	if (error instanceof HttpError) {
		const { statusCode, message } = error;
		res.status(error.statusCode).json({
			success: "unsuccessful",
			status_code: statusCode,
			message: message,
		});
	} else {
		res.status(error.statusCode || 500).json({
			success: "unsuccessful",
			status_code: error.statusCode || 500,
			message: error.message || "Internal server error",
		});
	}
};

export { HttpError, errorHandler, routeNotFound };
