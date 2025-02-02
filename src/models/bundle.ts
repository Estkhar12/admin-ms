import { Document, model, Schema } from 'mongoose';

export interface IBundle extends Document {
  bundleName: string;
  price: number;
  discount?: number;
  isDeleted: boolean;
  isBlocked: boolean;
  platformDiscount?: number;
  discountedPrice?: number;
  _blockedBy: Schema.Types.ObjectId;
  _products: Schema.Types.ObjectId[];
  _createdBy: {
    _id: Schema.Types.ObjectId;
    role: 'seller' | 'admin';
  };
}

const bundleSchema: Schema = new Schema(
  {
    bundleName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    _products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    discount: {
      type: Number,
      default: undefined,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    platformDiscount: {
      type: Number,
      default: undefined,
    },
    discountedPrice: {
      type: Number,
      default: undefined,
    },
    _blockedBy: {
      type: Schema.Types.ObjectId,
      default: undefined,
    },

    _createdBy: {
      _id: {
        type: Schema.Types.ObjectId,
      },
      role: {
        type: String,
        enum: ['seller', 'admin'],
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const Bundle = model<IBundle>('Bundle', bundleSchema);

export default Bundle;
