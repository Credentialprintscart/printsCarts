import connectDB from '@/lib/db';
import User from '@/models/User';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp, password, newPassword } = await req.json();

    const actualPassword = newPassword || password;

    if (!email || !otp || !actualPassword) {
      return errorResponse('Email, OTP, and new password are required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ 
      email: normalizedEmail,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user) {
      return errorResponse('Invalid or expired OTP session', 400);
    }

    // Update password
    user.password = actualPassword;
    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true; // User is now verified since they recovered account
    await user.save();

    return successResponse({ message: 'Password reset successfully' });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
