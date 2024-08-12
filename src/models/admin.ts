import { Document, model, Schema } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  isBlocked: boolean;
  _blockBy: Schema.Types.ObjectId;
  role: 'admin' | 'superAdmin';
}

const adminSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superAdmin'],
    default: 'admin',
  },
  _blockBy: {
    type: Schema.Types.ObjectId,
    default: undefined,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
