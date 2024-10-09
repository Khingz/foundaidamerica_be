export const sendJsonResponse = (
	res,
	statusCode,
	data,
	message,
	accessToken
) => {
	const responsePayload = {
		status: "success",
		message,
		status_code: statusCode,
		data,
	};
	if (accessToken) {
		responsePayload.access_token = accessToken;
	}

	res.status(statusCode).json(responsePayload);
};
