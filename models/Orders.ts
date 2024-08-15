import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: string;
  date: Date;
}

const OrderSchema: Schema<IOrder> = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
