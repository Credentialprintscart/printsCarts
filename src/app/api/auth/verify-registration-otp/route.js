import connectDB from '@/lib/db';
import User from '@/models/User';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return errorResponse('Email and OTP are required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ 
      email: normalizedEmail,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user) {
      return errorResponse('Invalid or expired OTP', 400);
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return successResponse({ message: 'Account verified successfully' });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
