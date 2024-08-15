import mongoose, { Document, Schema } from 'mongoose';

export interface IShippingAddress extends Document {
  division: string;
  district: string;
  address: string;
  name: string;
  phone: string;
}

const ShippingAddressSchema: Schema<IShippingAddress> = new mongoose.Schema({
  division: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model<IShippingAddress>('ShippingAddress', ShippingAddressSchema);
