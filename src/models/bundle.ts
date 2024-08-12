import { Document, model, Schema } from 'mongoose';

interface IBundle extends Document {}

const bundleSchema: Schema = new Schema({});

const Bundle = model<IBundle>('Bundle', bundleSchema);
export default Bundle;
