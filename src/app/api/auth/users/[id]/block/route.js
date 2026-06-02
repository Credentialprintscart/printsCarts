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

    const userToBlock = await User.findById(id);

    if (userToBlock) {
      if (userToBlock.isAdmin) {
        return errorResponse('Cannot block admin user', 400);
      }
      userToBlock.isBlocked = true;
      await userToBlock.save();
      return successResponse({ message: 'User blocked successfully' });
    } else {
      return errorResponse('User not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
