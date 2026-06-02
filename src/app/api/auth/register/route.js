import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    await connectDB();
    const { firstName, lastName, email, password, otp } = await req.json();
    
    if (!firstName || !lastName || !email || !password || !otp) {
      return errorResponse('Please fill in all fields including OTP', 400);
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    // Verify OTP first (OTP must have been sent to this email)
    // For registration, we can't find user by email yet if they haven't registered
    // but the send-otp route might have created a temporary user or we handle it here
    // Let's assume send-otp sends email and we verify against the database if user was created
    // or we check a separate OTP collection.
    // Given current User model update, let's assume send-otp creates a placeholder or we verify it differently.
    
    // Optimized flow: check if a user with this email and OTP exists and is not yet verified
    const userWithOtp = await User.findOne({
      email: trimmedEmail,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!userWithOtp && ! (await User.findOne({email: trimmedEmail}))) {
        // If user doesn't exist at all, they need to request OTP first
        return errorResponse('Please request an OTP first', 400);
    }

    if (userWithOtp && userWithOtp.isVerified) {
        return errorResponse('User already verified. Please login.', 400);
    }

    const userExists = await User.findOne({ email: trimmedEmail, isVerified: true });
    if (userExists) {
      return errorResponse('User already exists and is verified', 400);
    }

    let user;
    if (userWithOtp) {
        // Update the placeholder user
        userWithOtp.firstName = firstName;
        userWithOtp.lastName = lastName;
        userWithOtp.name = `${firstName} ${lastName}`;
        userWithOtp.password = password;
        userWithOtp.isVerified = true;
        userWithOtp.otp = null;
        userWithOtp.otpExpires = null;
        user = await userWithOtp.save();
    } else {
        // Fallback or if OTP was sent but user not created in DB yet
        // In a real flow, send-otp should have created the record or we'd check a separate collection
        return errorResponse('Invalid or expired OTP', 400);
    }

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
