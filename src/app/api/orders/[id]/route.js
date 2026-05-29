import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const order = await Order.findById(id).populate('user', 'name email');

    if (order) {
      return successResponse(order);
    } else {
      return errorResponse('Order not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
