import connectDB from '@/lib/db';
import User from '@/models/User';
import { protect, admin } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req) {
  try {
    const user = await protect(req);
    admin(user);
    await connectDB();
    
    const users = await User.find({});
    return successResponse(users);
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
