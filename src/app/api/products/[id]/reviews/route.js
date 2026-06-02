import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { protect } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

// @desc    Create new review
// @route   POST /api/products/:id/reviews
export async function POST(req, { params }) {
  try {
    const user = await protect(req);
    await connectDB();
    const { id } = await params;
    const { rating, comment } = await req.json();

    const product = await Product.findById(id);

    if (product) {
      // Check if user has purchased the product and it is delivered
      // Admins can always review
      if (!user.isAdmin) {
        const order = await Order.findOne({
          user: user._id,
          'orderItems.product': id,
          isDelivered: true
        });

        if (!order) {
          return errorResponse('You can only review products you have purchased and received.', 400);
        }
      }

      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === user._id.toString()
      );

      if (alreadyReviewed) {
        return errorResponse('You have already reviewed this product', 400);
      }

      const review = {
        name: user.name,
        rating: Number(rating),
        comment,
        user: user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      return successResponse({ message: 'Review added' }, 201);
    } else {
      return errorResponse('Product not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}

// @desc    Update product review
// @route   PUT /api/products/:id/reviews
export async function PUT(req, { params }) {
  try {
    const user = await protect(req);
    await connectDB();
    const { id } = await params;
    const { rating, comment } = await req.json();

    const product = await Product.findById(id);

    if (product) {
      const reviewIndex = product.reviews.findIndex(
        (r) => r.user.toString() === user._id.toString()
      );

      if (reviewIndex !== -1) {
        product.reviews[reviewIndex].rating = Number(rating);
        product.reviews[reviewIndex].comment = comment;
        product.reviews[reviewIndex].name = user.name;

        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        return successResponse({ message: 'Review updated' });
      } else {
        return errorResponse('Review not found', 404);
      }
    } else {
      return errorResponse('Product not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}

// @desc    Delete product review
// @route   DELETE /api/products/:id/reviews
export async function DELETE(req, { params }) {
  try {
    const user = await protect(req);
    await connectDB();
    const { id } = await params;

    const product = await Product.findById(id);

    if (product) {
      const reviewIndex = product.reviews.findIndex(
        (r) => r.user.toString() === user._id.toString()
      );

      if (reviewIndex !== -1) {
        product.reviews.splice(reviewIndex, 1);
        product.numReviews = product.reviews.length;
        
        if (product.reviews.length > 0) {
          product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
        } else {
          product.rating = 0;
        }

        await product.save();
        return successResponse({ message: 'Review deleted' });
      } else {
        return errorResponse('Review not found', 404);
      }
    } else {
      return errorResponse('Product not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
