import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password, isAdminLogin } = await req.json();
    
    const normalizedEmail = email ? email.trim().toLowerCase() : '';
    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.matchPassword(password))) {
      if (user.isBlocked) {
        return errorResponse('Your account has been blocked by admin. Please contact support.', 403);
      }

      if (!isAdminLogin && user.isAdmin) {
        return errorResponse('You are not our user', 401);
      }

      if (isAdminLogin && !user.isAdmin) {
        return errorResponse('Not authorized as an admin', 401);
      }

      return successResponse({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      return errorResponse('Invalid email or password', 401);
    }
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
