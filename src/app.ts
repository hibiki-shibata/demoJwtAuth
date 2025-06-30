import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../route/auth.route';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;
