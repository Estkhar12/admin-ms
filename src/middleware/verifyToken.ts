const jwt_secret: string = process.env.JWT_SECRET as string;
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Admin from '../models/admin';

interface JwtPayload {
  _id: string;
  role: string;
}

export const verify_token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;
    // Type assertion to JwtPayload
    if (
      !decoded ||
      typeof decoded._id !== 'string' ||
      typeof decoded.role !== 'string'
    ) {
      return res.status(400).json({ error: 'Invalid token payload' });
    }
    const user = await Admin.findById(decoded._id);
    if (!user) {
      return res.status(400).json({ error: 'Invalid user' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('Something went wrong while verifying the token', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
