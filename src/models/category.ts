import { Document, model, Schema } from 'mongoose';

export interface ICategory extends Document {
  categoryName: string;
  isDeleted: boolean;
  _createdBy: Schema.Types.ObjectId;
}

const categorySchema: Schema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    _createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Category = model<ICategory>('Category', categorySchema);

export default Category;
