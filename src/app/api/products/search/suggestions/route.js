import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { successResponse, errorResponse } from '@/lib/apiHelpers';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return successResponse([]);
    }

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const suggestions = await Product.find({
      $or: [
        { title: { $regex: `^${escapedQuery}`, $options: 'i' } },
        { brand: { $regex: `^${escapedQuery}`, $options: 'i' } },
        { color: { $regex: `^${escapedQuery}`, $options: 'i' } }
      ]
    }).select('title brand color images slug price').limit(10);

    return successResponse(suggestions);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
