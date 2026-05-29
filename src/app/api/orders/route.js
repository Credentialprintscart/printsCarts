import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    const user = await protect(req);
    await connectDB();
    
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = await req.json();

    if (orderItems && orderItems.length === 0) {
      return errorResponse('No order items', 400);
    } else {
      const order = new Order({
        orderItems: orderItems.map((x) => ({
          name: x.title,
          qty: x.qty,
          image: x.image,
          price: x.price,
          product: x.product,
        })),
        user: user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      
      // Socket.io notification skipped for now or should be handled via server actions if needed
      
      return successResponse(createdOrder, 201);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}

export async function GET(req) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();

    const { searchParams } = new URL(req.url);
    const fetchAll = searchParams.get('fetchAll') === 'true';
    const pageSize = 20;
    const page = Number(searchParams.get('page')) || 1;
    
    const search = searchParams.get('search') ? {
      _id: {
        $regex: searchParams.get('search'),
        $options: 'i',
      },
    } : {};
    
    if (fetchAll) {
      const orders = await Order.find({}).populate('user', '_id name email').sort({ createdAt: -1 });
      return successResponse({ orders, page: 1, pages: 1, count: orders.length });
    } else {
      const count = await Order.countDocuments(search);
      const orders = await Order.find(search)
        .populate('user', '_id name email')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });
        
      return successResponse({ orders, page, pages: Math.ceil(count / pageSize), count });
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
