import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Category from '../../../models/category';

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { categoryId } = req.query;
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ error: 'Invalid category Id!' });
    }
    const data = await Category.findOne({
      _id: categoryId,
      _createdBy: _id,
    });
    if (!data) {
      return res.status(404).json({ error: 'Category is not available!' });
    }
    data.isDeleted = true;
    await data.save();
    return res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default deleteCategory;
