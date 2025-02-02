import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Bundle from '../../../models/bundle';
import Product from '../../../models/product';

const updateBundle = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { bundleId } = req.query;
    const { bundleName, productsId, discount } = req.body;

    if (!isValidObjectId(bundleId)) {
      return res.status(400).json({ error: 'Invalid bundle Id.' });
    }

    const bundle = await Bundle.findOne({
      _id: bundleId,
      '_createdBy._id': _id,
    });
    if (!bundle) {
      return res.status(400).json({ error: 'No bundle found.' });
    }
    if (bundle.isDeleted) {
      return res.status(400).json({ error: 'this bundle has been deleted.' });
    }
    if (bundle.isBlocked) {
      return res.status(400).json({
        error: 'This bundle has been blocked.',
      });
    }
    let totalPrice = 0;

    if (productsId) {
      // Validate that productsId is an array of valid ObjectId strings
      if (
        !Array.isArray(productsId) ||
        productsId.some((id) => !isValidObjectId(id))
      ) {
        return res.status(400).json({ error: 'Invalid product IDs provided' });
      }

      // Remove duplicate IDs
      const uniqueProductIds = [...new Set(productsId)];
      // Filter out product IDs that are already had been added to this bundle
      const newProductIds = uniqueProductIds.filter(
        (id) => !bundle._products.map((pId) => pId.toString()).includes(id)
      );

      if (newProductIds.length === 0) {
        return res.status(400).json({
          error: 'All provided products already had been added to this bundle.',
        });
      }
      // Find products by their _id and _createdBy._id
      const products = await Product.find({
        _id: { $in: newProductIds },
        isDeleted: false,
        isBlocked: false,
      });

      if (products.length !== newProductIds.length) {
        return res.status(404).json({ error: 'Some products not found' });
      }

      // Combine existing product IDs with the new ones
      const combinedProductIds = [...bundle._products, ...newProductIds];

      // Find all products including the existing ones
      const allProducts = await Product.find({
        _id: { $in: combinedProductIds },
      });

      // Calculate the total price of all products
      totalPrice = allProducts.reduce((sum, product) => sum + product.price, 0);

      bundle._products = combinedProductIds;
    } else {
      // Calculate the total price of the existing products
      const existingProducts = await Product.find({
        _id: { $in: bundle._products },
      });
      totalPrice = existingProducts.reduce(
        (sum, product) => sum + product.price,
        0
      );
    }

    // Update only the provided fields
    if (bundleName !== undefined) bundle.bundleName = bundleName;
    if (discount !== undefined) {
      // Ensure the discount is a number, greater than 0, and does not exceed 100
      const discountValue = Number(discount);
      if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
        return res.status(400).json({
          error: 'Discount must be a number greater than 0 and not exceed 100',
        });
      }
      bundle.discount = discountValue;
    }
    // Apply the discount if provided
    const finalPrice = bundle.discount
      ? totalPrice - (totalPrice * bundle.discount) / 100
      : totalPrice;
    bundle.price = finalPrice;

    await bundle.save();

    return res.status(200).json({ success: true, data: bundle });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default updateBundle;
