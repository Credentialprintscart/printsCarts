import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    await connectDB();
    const { firstName, lastName, email, password } = await req.json();
    
    if (!firstName || !lastName || !email || !password) {
      return errorResponse('Please fill in all fields', 400);
    }

    const trimmedEmail = email.trim().toLowerCase();
    const userExists = await User.findOne({ email: trimmedEmail });
    
    if (userExists) {
      return errorResponse('User already exists', 400);
    }

    const user = await User.create({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: trimmedEmail,
      password,
    });

    if (user) {
      return successResponse({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      }, 201);
    } else {
      return errorResponse('Invalid user data', 400);
    }
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
