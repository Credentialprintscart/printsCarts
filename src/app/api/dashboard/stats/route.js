import connectDB from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();

    const totalOrders = await Order.countDocuments();
    const totalRevenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalCustomers = await User.countDocuments({ isAdmin: false });
    const totalProducts = await Product.countDocuments();

    return successResponse({
      totalOrders,
      totalRevenue: totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0,
      totalCustomers,
      totalProducts
    });
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
