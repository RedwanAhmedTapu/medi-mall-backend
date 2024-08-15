// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;
  isVerified: boolean;
  verificationCode: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);
