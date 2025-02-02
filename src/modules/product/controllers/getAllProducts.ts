import { Request, Response } from 'express';
import Product from '../../../models/product';

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    // Create the initial match filter
    const matchFilter: any = { isBlocked: false, isDeleted: false };
    if (search) {
      matchFilter.$or = [{ name: { $regex: search, $options: 'i' } }];
    }
    if (category) {
      matchFilter['category.name'] = { $regex: category, $options: 'i' };
    }
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: '_category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $match: matchFilter,
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $sort: { name: 1 } },
            { $skip: (pageNumber - 1) * limitNumber },
            { $limit: limitNumber },
            {
              $project: {
                _id: 1,
                name: 1,
                price: 1,
                mrp: 1,
                discount: 1,
                description: 1,
                stockAvailable: 1,
                category: '$category.name',
                platformDiscount: {
                  $cond: {
                    if: { $gt: ['$platformDiscount', null] },
                    then: '$platformDiscount',
                    else: '$$REMOVE',
                  },
                },
                discountedPrice: {
                  $cond: {
                    if: { $gt: ['$discountedPrice', null] },
                    then: '$discountedPrice',
                    else: '$$REMOVE',
                  },
                },
                _createdBy: 1,
              },
            },
          ],
        },
      },
    ]);

    const totalItems = products[0]?.metadata[0]?.total || 0;
    const paginatedData = products[0]?.data || [];

    return res.status(200).json({
      success: true,
      page: pageNumber,
      itemsPerPage: limitNumber,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNumber),
      data: paginatedData,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default getAllProduct;
