import connectDB from '@/lib/db';
import User from '@/models/User';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function DELETE(req, { params }) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();
    const { id } = await params;

    const userToDelete = await User.findById(id);

    if (userToDelete) {
      if (userToDelete.isAdmin) {
        return errorResponse('Cannot delete admin user', 400);
      }
      await userToDelete.deleteOne();
      return successResponse({ message: 'User removed' });
    } else {
      return errorResponse('User not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
