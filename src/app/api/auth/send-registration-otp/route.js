import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateOTP, sendOTPEmail } from '@/lib/emailService';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    await connectDB();
    const { firstName, lastName, email, password } = await req.json();

    if (!email) {
      return errorResponse('Email is required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (user && user.isVerified) {
      return errorResponse('Email already registered and verified', 400);
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.name = `${user.firstName} ${user.lastName}`;
      if (password) {
        user.password = password;
      }
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      await User.create({
        firstName: firstName || 'Pending',
        lastName: lastName || 'Verification',
        name: `${firstName || 'Pending'} ${lastName || 'Verification'}`,
        email: normalizedEmail,
        password: password || Math.random().toString(36).slice(-10),
        otp,
        otpExpires,
        isVerified: false
      });
    }

    const emailSent = await sendOTPEmail(normalizedEmail, otp, 'registration');

    if (emailSent) {
      return successResponse({ message: 'OTP sent successfully', otp: process.env.NODE_ENV === 'development' ? otp : undefined });
    } else {
      return errorResponse('Failed to send email. Please check your SMTP settings.', 500);
    }
  } catch (error) {
    console.error('Registration OTP Error:', error);
    return errorResponse(error.message, 500);
  }
}
