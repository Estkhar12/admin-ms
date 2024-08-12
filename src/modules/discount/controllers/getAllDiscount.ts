import { Request, Response } from 'express';
import Discount from '../../../models/discount';

export const getAllDiscount = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const searchFilter = { isDeleted: false };
    const data = await Discount.find(searchFilter)
      .sort({ startDate: 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalData = await Discount.countDocuments(searchFilter);
    return res.status(200).json({
      success: true,
      page: pageNumber,
      itemsPerPage: limitNumber,
      totalItems: totalData,
      totalPages: Math.ceil(totalData / limitNumber),
      data: data,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
