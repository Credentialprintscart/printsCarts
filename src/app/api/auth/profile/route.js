import connectDB from '@/lib/db';
import User from '@/models/User';
import { protect, generateToken } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function GET(req) {
  try {
    const user = await protect(req);
    await connectDB();
    
    const currentUser = await User.findById(user._id);

    if (currentUser) {
      return successResponse({
        _id: currentUser._id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        name: currentUser.name,
        email: currentUser.email,
        isAdmin: currentUser.isAdmin,
      });
    } else {
      return errorResponse('User not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}

export async function PUT(req) {
  try {
    const user = await protect(req);
    await connectDB();
    
    const { firstName, lastName, email, password } = await req.json();
    const currentUser = await User.findById(user._id);

    if (currentUser) {
      currentUser.firstName = firstName || currentUser.firstName;
      currentUser.lastName = lastName || currentUser.lastName;
      currentUser.name = (firstName || lastName) ? `${firstName || currentUser.firstName} ${lastName || currentUser.lastName}` : currentUser.name;
      currentUser.email = email || currentUser.email;
      
      if (password) {
        currentUser.password = password;
      }

      const updatedUser = await currentUser.save();

      return successResponse({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      return errorResponse('User not found', 404);
    }
  } catch (error) {
    return errorResponse(error.message, error.message.includes('authorized') ? 401 : 500);
  }
}
