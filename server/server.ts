import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/userRoutes';
import categoryRoutes from '../routes/category'
import productRoutes from '../routes/product'
import variantRoutes from '../routes/variant'
// import { tokenBasedAuthentication } from '../middleware/auth';
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
    origin: '*', // Allow all origins (not recommended for production)
  })
);

// Set up routes
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/product', productRoutes);
app.use('/variant', variantRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
