import mongoose, { Document, Schema } from 'mongoose';

// Define an interface to type the Variant document
export interface IVariant extends Document {
  name: string;
  price: number;
}

// Define the Variant Schema
const VariantSchema: Schema<IVariant> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Create and export the Variant model
export default mongoose.model<IVariant>('Variant', VariantSchema);
