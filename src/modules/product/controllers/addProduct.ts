import { Request, Response } from 'express';
import Category from '../../../models/category';
import Product from '../../../models/product';

const addProduct = async (req: Request, res: Response) => {
  try {
    const { _id, role } = req.user;
    const {
      productName,
      description,
      mrp,
      discount,
      _category,
      stockAvailable,
    } = req.body;
    const category = await Category.findById(_category);
    if (!category) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    if (category.isDeleted) {
      return res.status(400).json({ error: 'This category has been deleted.' });
    }
    const finalPrice =
      discount > 0 || discount <= 100 ? mrp - (mrp * discount) / 100 : mrp;

    const product = await Product.create({
      productName,
      price: finalPrice,
      description,
      mrp,
      discount,
      _category,
      stockAvailable,
      _createdBy: {
        _id: _id,
        role: role,
      },
    });
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default addProduct;
