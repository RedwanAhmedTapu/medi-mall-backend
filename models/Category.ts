import mongoose, { Document, Schema } from 'mongoose';

// Define an interface to type the Category document
export interface ICategory extends Document {
  name: string;
  slug: string;
  thumbnail: string;
}

// Define the Category Schema
const CategorySchema: Schema<ICategory> = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
});

// Create and export the Category model
export default mongoose.model<ICategory>('Category', CategorySchema);
