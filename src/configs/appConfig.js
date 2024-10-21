import dotenv from "dotenv";
dotenv.config();

const appConfig = {
	port: process.env.PORT || 5000,
	accessCode: process.env.ACCESS_CODE,
	db_url: process.env.DATABASE_URL,
	tokenSecret: process.env.TOKEN_SECRET,
	serverUrl: process.env.SERVER_URL,
	clientUrl: process.env.CLIENT_URL
};

export default appConfig;
