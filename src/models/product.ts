import { Document, model, Schema } from 'mongoose';

interface IProduct extends Document {}

const productSchema: Schema = new Schema({});

const Product = model<IProduct>('Product', productSchema);
export default Product;
