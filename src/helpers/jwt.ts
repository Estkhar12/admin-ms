import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export interface IPayload {
  _id: string;
  role: string;
}

export const generate_token = (payload: IPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};
