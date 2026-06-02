import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateOTP, sendOTPEmail } from '@/lib/emailService';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return errorResponse('Email is required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return errorResponse('No account found with this email', 404);
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const emailSent = await sendOTPEmail(normalizedEmail, otp, 'forgot-password');

    if (emailSent) {
      return successResponse({ message: 'Password reset OTP sent successfully' });
    } else {
      return errorResponse('Failed to send email. Please check your SMTP settings.', 500);
    }
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
