import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { protect } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

/**
 * @desc    Check if user can review a product
 * @route   GET /api/orders/check-review-eligibility/:id (productId)
 * @access  Private
 */
export async function GET(req, { params }) {
  try {
    const user = await protect(req);
    if (!user) return errorResponse('Unauthorized', 401);

    await connectDB();

    const { id: productId } = await params;

    // Admin can always review
    if (user.isAdmin) {
      return successResponse({ canReview: true });
    }

    const order = await Order.findOne({
      user: user._id,
      'orderItems.product': productId,
      isDelivered: true
    });

    if (order) {
      return successResponse({ canReview: true });
    } else {
      return successResponse({ canReview: false });
    }
  } catch (error) {
    console.error('Review Eligibility Check Error:', error);
    return errorResponse(error.message, 500);
  }
}
