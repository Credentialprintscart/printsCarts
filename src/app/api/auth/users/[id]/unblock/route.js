import connectDB from '@/lib/db';
import User from '@/models/User';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function PUT(req, { params }) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();
    const { id } = await params;

    const userToUnblock = await User.findById(id);

    if (userToUnblock) {
      userToUnblock.isBlocked = false;
      await userToUnblock.save();
      return successResponse({ message: 'User unblocked successfully' });
    } else {
      return errorResponse('User not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
