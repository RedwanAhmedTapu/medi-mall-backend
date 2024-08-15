import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const URL = process.env.MONGODBURL as string;

if (!URL) {
  throw new Error("MONGODBURL environment variable is not defined");
}

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
  })
  .catch((error: Error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });
