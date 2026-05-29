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

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    // Total Revenue
    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Current Month Revenue
    const currentMonthRevenue = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: currentMonthStart } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const currentRevenue = currentMonthRevenue.length > 0 ? currentMonthRevenue[0].total : 0;

    // Last Month Revenue
    const lastMonthRevenue = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const lastRevenue = lastMonthRevenue.length > 0 ? lastMonthRevenue[0].total : 0;

    const revenueGrowth = lastRevenue > 0
      ? (((currentRevenue - lastRevenue) / lastRevenue) * 100).toFixed(1)
      : currentRevenue > 0 ? 100 : 0;

    // Orders
    const totalOrders = await Order.countDocuments();
    const currentMonthOrders = await Order.countDocuments({ createdAt: { $gte: currentMonthStart } });
    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
    });

    const ordersGrowth = lastMonthOrders > 0
      ? (((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100).toFixed(1)
      : currentMonthOrders > 0 ? 100 : 0;

    // Customers
    const totalCustomers = await User.countDocuments({ isAdmin: false });
    const currentMonthCustomers = await User.countDocuments({
      isAdmin: false,
      createdAt: { $gte: currentMonthStart }
    });
    const lastMonthCustomers = await User.countDocuments({
      isAdmin: false,
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
    });

    const customersGrowth = lastMonthCustomers > 0
      ? (((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100).toFixed(1)
      : currentMonthCustomers > 0 ? 100 : 0;

    // Recent Orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10)
      .select('_id user totalPrice status isPaid createdAt');

    // Orders by Status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Revenue by Month
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const revenueByMonth = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    return successResponse({
      revenue: {
        total: totalRevenue,
        growth: parseFloat(revenueGrowth)
      },
      orders: {
        total: totalOrders,
        growth: parseFloat(ordersGrowth)
      },
      customers: {
        total: totalCustomers,
        growth: parseFloat(customersGrowth)
      },
      recentOrders,
      ordersByStatus,
      revenueByMonth
    });
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
