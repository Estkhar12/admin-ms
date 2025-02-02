import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../../../models/product';
import Bundle from '../../../models/bundle';

const addBundle = async (req: Request, res: Response) => {
  try {
    const { _id, role } = req.user;
    const { bundleName, productsId, discount } = req.body;

    // Validate that productsId is an array of valid ObjectId strings
    if (
      !Array.isArray(productsId) ||
      productsId.some((id) => !mongoose.isValidObjectId(id))
    ) {
      return res.status(400).json({ error: 'Invalid product IDs provided' });
    }
    // Remove duplicate IDs
    const uniqueProductIds = [...new Set(productsId)];

    // Convert uniqueProductIds to array of ObjectId
    const productIds = uniqueProductIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Find products by their _id
    const products = await Product.find({
      _id: { $in: productIds },
      isDeleted: false,
      isBlocked: false,
    });

    // console.log(products)
    if (products.length !== productIds.length) {
      return res.status(404).json({ error: 'Some products not found' });
    }

    // Calculate the total price of the products
    const totalPrice = products.reduce(
      (sum, product) => sum + product.price,
      0
    );

    // Ensure the discount is a number and does not exceed 100
    const discountValue = discount ? Number(discount) : 0;
    if (isNaN(discountValue) || discountValue > 100) {
      return res
        .status(400)
        .json({ error: 'Discount must be a number and not exceed 100' });
    }

    // Apply the discount if provided
    const finalPrice =
      discountValue > 0
        ? totalPrice - (totalPrice * discountValue) / 100
        : totalPrice;

    // Create the bundle with the calculated price
    const bundle = await Bundle.create({
      bundleName,
      price: finalPrice,
      _products: productIds,
      discount,
      _createdBy: {
        _id: _id,
        role: role,
      },
    });

    return res.status(201).json({ success: true, data: bundle });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default addBundle;
