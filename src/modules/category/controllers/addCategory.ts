import { Request, Response } from 'express';
import Category from '../../../models/category';
import Admin from '../../../models/admin';

const addCategory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: 'Please enter category name!' });
    }
    const user = await Admin.findById(_id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user access!' });
    }
    const category = await Category.create({
      _createdBy: user._id,
      categoryName,
    });
    return res.status(200).json({
      success: true,
      message: 'category added successfully',
      data: category,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default addCategory;
