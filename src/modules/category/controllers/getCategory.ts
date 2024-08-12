import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Category from '../../../models/category';

const getCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;
    if (!isValidObjectId(categoryId)) {
      return res.status(404).json({ error: 'Invalid category Id ' });
    }
    const data = await Category.findOne({ _id: categoryId });
    if (!data) {
      return res.status(400).json({ error: 'Category is not available!' });
    }
    if (data.isDeleted) {
      return res
        .status(404)
        .json({ error: 'This category has been deleted! ' });
    }
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default getCategory;
