import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { protect } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';
import axios from 'axios';

export async function POST(req) {
  try {
    await protect(req);
    await connectDB();
    
    const { amount, orderId, source } = await req.json();

    if (!amount || !orderId || !source) {
      return errorResponse('Missing payment data', 400);
    }

    const cloverUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://api.clover.com/v1/charges'
        : 'https://sandbox.dev.clover.com/v1/charges';

    try {
      const response = await axios.post(
        cloverUrl,
        {
          amount: Math.round(amount * 100), // cents
          currency: 'USD',
          source,
          metadata: { orderId },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOVER_PRIVATE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data || !response.data.id) {
        return errorResponse('Clover payment failed', 400);
      }

      const order = await Order.findById(orderId);
      if (!order) {
        return errorResponse('Order not found', 404);
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: response.data.id,
        status: response.data.status,
      };

      await order.save();

      return successResponse({
        success: true,
        message: 'Payment successful',
        payment: response.data
      });
    } catch (error) {
      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.status = 'Failed';
          await order.save();
        }
      }
      
      return errorResponse(error.response?.data?.message || 'Payment failed', 400);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
