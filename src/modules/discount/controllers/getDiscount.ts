
import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Discount from '../../../models/discount';

export const getDiscount = async (req: Request, res: Response) => {
  try {
    const { discountId } = req.query;
    if (!isValidObjectId(discountId)) {
      return res.status(400).json({ error: 'Invalid discount Id.' });
    }
    const data = await Discount.findById(discountId);
    if (!data) {
      return res.status(400).json({ error: 'No discount available.' });
    }
    if (data.isDeleted) {
      return res.status(400).json({ error: 'This discount has been deleted.' });
    }
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
