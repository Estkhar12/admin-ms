import { Document, model, Schema } from 'mongoose';

interface IDiscount extends Document {}

const discountSchema: Schema = new Schema({
    
});

const Discount = model<IDiscount>('Discount', discountSchema);
export default Discount;
