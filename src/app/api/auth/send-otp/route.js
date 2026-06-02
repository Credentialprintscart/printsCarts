import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateOTP, sendOTPEmail } from '@/lib/emailService';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    await connectDB();
    const { email, type } = await req.json(); // type: 'registration' or 'forgot-password'

    if (!email) {
      return errorResponse('Email is required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (type === 'registration' && user && user.isVerified) {
      return errorResponse('Email already registered and verified', 400);
    }

    if (type === 'forgot-password' && !user) {
      return errorResponse('No account found with this email', 404);
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (user) {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else if (type === 'registration') {
      // Create a temporary unverified user for registration
      await User.create({
        firstName: 'Pending',
        lastName: 'Verification',
        name: 'Pending Verification',
        email: normalizedEmail,
        password: Math.random().toString(36).slice(-10), // Random temporary password
        otp,
        otpExpires,
        isVerified: false
      });
    }

    const emailSent = await sendOTPEmail(normalizedEmail, otp, type);

    if (emailSent) {
      return successResponse({ message: 'OTP sent successfully', otp: process.env.NODE_ENV === 'development' ? otp : undefined });
    } else {
      return errorResponse('Failed to send email. Please check your SMTP settings.', 500);
    }
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
