import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { protect } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req) {
  try {
    const user = await protect(req);
    await connectDB();
    
    const orders = await Order.find({ user: user._id });
    return successResponse(orders);
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
