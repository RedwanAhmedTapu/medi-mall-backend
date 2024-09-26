import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authenticateToken } from '../middleware/auth';
import authRoutes from '../routes/userRoutes';
import categoryRoutes from '../routes/category'
import productRoutes from '../routes/product'
import variantRoutes from '../routes/variant'
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app: Application = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
import '../db/connection';

// Set up CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow all origins (not recommended for production)
    credentials: true, // Allow sending cookies
  })
);

// Set up routes
app.use('/auth', authRoutes);
app.use('/categories',authenticateToken, categoryRoutes);
app.use('/product', productRoutes);
app.use('/variant',authenticateToken, variantRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
