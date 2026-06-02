import nodemailer from 'nodemailer';

let transporter = null;

const initializeTransporter = async () => {
  if (transporter) return transporter;

  // Use the SMTP configuration from .env.local (Lines 44-47)
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.printscarts.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: true, // Force secure for port 465
    auth: {
      user: process.env.SMTP_USER || 'no-reply@printscarts.com',
      pass: process.env.SMTP_PASS || '%y}r7f@mfA}o*r.H'
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    }
  });

  return transporter;
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendEmail = async ({ to, subject, html, text, fromName, replyTo }) => {
  try {
    const mailTransporter = await initializeTransporter();
    
    const info = await mailTransporter.sendMail({
      from: `"${fromName || 'PrintsCarts'}" <${process.env.SMTP_USER || 'no-reply@printscarts.com'}>`,
      to: to || process.env.CONTACT_RECEIVER_EMAIL,
      replyTo,
      subject,
      text,
      html
    });

    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendOTPEmail = async (email, otp, type = 'registration') => {
  try {
    const mailTransporter = await initializeTransporter();
    const subject = type === 'registration' ? 'Verify your PrintsCarts Account' : 'Password Reset OTP';
    
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0f3d91; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.02em;">PRINTS<span style="color: #1e293b;">CARTS</span></h1>
        </div>
        <div style="background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1e293b; margin-top: 0; font-size: 20px; font-weight: 800; text-align: center;">${subject}</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #475569; text-align: center;">Your One-Time Password (OTP) for account verification is:</p>
          <div style="font-size: 42px; font-weight: 900; letter-spacing: 8px; color: #0f3d91; margin: 30px 0; text-align: center; background-color: #f0f4ff; padding: 20px; border-radius: 12px;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #64748b; text-align: center;">This code will expire in <strong>10 minutes</strong>. For your security, please do not share this code with anyone.</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; ${new Date().getFullYear()} PrintsCarts Official. All rights reserved.</p>
          <p style="font-size: 12px; color: #94a3b8; margin: 5px 0 0;">This is an automated security notification.</p>
        </div>
      </div>
    `;

    const info = await mailTransporter.sendMail({
      from: `"PrintsCarts Security" <${process.env.SMTP_USER || 'no-reply@printscarts.com'}>`,
      to: email,
      subject,
      html
    });

    console.log('OTP Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Nodemailer Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    return false;
  }
};
