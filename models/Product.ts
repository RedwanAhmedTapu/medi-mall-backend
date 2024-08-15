import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
  primaryCategoryId?: mongoose.Types.ObjectId;
  secondaryCategoryId?: mongoose.Types.ObjectId;
  tertiaryCategoryId?: mongoose.Types.ObjectId;
  variants?: mongoose.Types.ObjectId[];
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  photos: [{ type: String }],
  description: { type: String, required: true },
  metaKey: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stockStatus: { type: Boolean, default: true },
  status: { type: Boolean, default: true },
  primaryCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  secondaryCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tertiaryCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }]
});

export default mongoose.model<IProduct>('Product', ProductSchema);
