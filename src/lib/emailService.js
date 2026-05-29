import nodemailer from 'nodemailer';

let transporter = null;

const initializeTransporter = async () => {
  if (transporter) return transporter;

  if (process.env.EMAIL_SERVICE === 'ethereal') {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_PORT == 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  return transporter;
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendEmail = async ({ to, subject, html, text, fromName, replyTo }) => {
  try {
    const mailTransporter = await initializeTransporter();
    
    const info = await mailTransporter.sendMail({
      from: `"${fromName || 'Prints Carts'}" <${process.env.EMAIL_USER}>`,
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
    const subject = type === 'registration' ? 'Verify your Prints Carts Account' : 'Password Reset OTP';
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0f3d91;">${subject}</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0f3d91; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999;">Prints Carts Official</p>
      </div>
    `;

    const info = await mailTransporter.sendMail({
      from: `"Prints Carts Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html
    });

    console.log('Message sent: %s', info.messageId);
    if (process.env.EMAIL_SERVICE === 'ethereal') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
