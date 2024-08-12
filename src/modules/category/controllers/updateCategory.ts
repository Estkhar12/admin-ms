import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Category from '../../../models/category';

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { categoryId } = req.query;
    const { categoryName } = req.body;
    if (!isValidObjectId) {
      return res.status(400).json({ error: 'Invalid category Id' });
    }
    const category = await Category.findOne({
      _id: categoryId,
      _createdBy: _id,
    });
    if (!category) {
      return res.status(404).json({ error: 'category is not found ' });
    }
    if (category.isDeleted) {
      return res.status(400).json({ error: 'Category has been deleted!' });
    }
    category.categoryName = categoryName;
    await category.save();
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateCategory;
