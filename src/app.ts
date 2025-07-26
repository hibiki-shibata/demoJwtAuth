import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../route/auth.route';
import { exceptionMiddleware } from '../middleware/exceptionMiddleware';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(exceptionMiddleware); //All Error in authRoutes will be handled by this middleware


export default app;
