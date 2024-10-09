import express from 'express';
import appConfig from './configs/appConfig.js';
import authRouter from './routes/authRoute.js';
import { errorHandler, routeNotFound } from './middleware/errors.js';
import connectDB from './utils/connectdB.js';

const port = appConfig.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false})); 


app.use('/api/auth', authRouter);

app.use(routeNotFound);
app.use(errorHandler);

const startServer = () => {
  connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
}

startServer();