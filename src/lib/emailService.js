import nodemailer from 'nodemailer';

let transporter = null;

const initializeTransporter = async () => {
  if (transporter) return transporter;

  // Use the SMTP configuration from environment, with fallbacks to legacy FORM_DATA_* vars
  const host = process.env.SMTP_HOST || process.env.FORM_DATA_HOST || 'localhost';
  const port = parseInt(process.env.SMTP_PORT || process.env.FORM_DATA_SMTP_PORT || '465');
  const user = process.env.SMTP_USER || process.env.FORM_DATA_MAIL || '';
  const pass = process.env.SMTP_PASS || process.env.FORM_DATA_PASSWORD || '';
  const secure = port === 465;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
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
    const defaultFromAddress = process.env.NO_REPLY_EMAIL || process.env.SMTP_USER || 'no-reply@printscarts.com';
    const defaultTo = to || process.env.FORM_DATA_MAIL || process.env.CONTACT_RECEIVER_EMAIL;

    if (!defaultTo) {
      throw new Error('No recipient configured for outgoing emails. Set FORM_DATA_MAIL or CONTACT_RECEIVER_EMAIL in environment.');
    }

    const mailOptions = {
      from: `"${fromName || 'PrintsCarts'}" <${defaultFromAddress}>`,
      to: defaultTo,
      replyTo: replyTo || undefined,
      subject,
      text,
      html,
      envelope: { from: defaultFromAddress, to: defaultTo }
    };

    console.log('Sending email:', { to: defaultTo, subject, from: defaultFromAddress });

    const info = await mailTransporter.sendMail(mailOptions);

    console.log('sendEmail response:', { messageId: info.messageId, response: info.response });

    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    if (process.env.NODE_ENV === 'development') {
      throw error;
    }
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

    const fromAddress = process.env.NO_REPLY_EMAIL || process.env.SMTP_USER || 'no-reply@printscarts.com';

    const info = await mailTransporter.sendMail({
      from: `"PrintsCarts Security" <${fromAddress}>`,
      to: email,
      subject,
      html,
      envelope: { from: fromAddress, to: email }
    });

    console.log('OTP Email sent:', { to: email, messageId: info.messageId, response: info.response });
    return true;
  } catch (error) {
    console.error('Nodemailer Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    if (process.env.NODE_ENV === 'development') {
      // Re-throw in development so API routes can return the underlying error message for debugging
      throw error;
    }
    return false;
  }
};
