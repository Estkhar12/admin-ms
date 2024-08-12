import { Request, Response } from 'express';
import Category from '../../../models/category';

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const searchFilter = search
      ? { isDeleted: false, name: { $regex: search, $options: 'i' } }
      : { isDeleted: false };
    const data = await Category.find(searchFilter)
      .sort({ name: 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    if (!data) {
      return res.status(404).json({ error: 'category is not available!' });
    }
    const totalData = await Category.countDocuments(searchFilter);
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

export default getAllCategory;
