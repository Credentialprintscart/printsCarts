import { sendEmail } from '@/lib/emailService';
import { errorResponse, successResponse } from '@/lib/apiHelpers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { type } = body;

    let subject, html, text, fromName, replyToEmail;

    // Determine configured receiver (support inbox) for all form submissions
    const receiver = process.env.FORM_DATA_MAIL || process.env.CONTACT_RECEIVER_EMAIL;
    if (!receiver) {
      return errorResponse('Contact receiver email is not configured. Set FORM_DATA_MAIL or CONTACT_RECEIVER_EMAIL in your environment.', 500);
    }

    if (type === 'return-exchange') {
      const { 
        fullName, email, phone, orderNumber, orderDate, 
        deliveryDate, productName, reason, itemCondition, 
        resolution, additionalDetails 
      } = body;

      if (!fullName || !email) {
        return errorResponse('Please fill in required fields: fullName and email', 400);
      }

      fromName = fullName;
      replyToEmail = email;

      subject = orderNumber ? `Return/Exchange Request: Order #${orderNumber} from ${fullName}` : `Return/Exchange Request from ${fullName}`;
      text = `Return/Exchange Request\n\nCustomer Information:\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nOrder Information:\nOrder Number: ${orderNumber || 'N/A'}\nOrder Date: ${orderDate || 'N/A'}\nDelivery Date: ${deliveryDate || 'N/A'}\n\nProduct Details:\nProduct Name: ${productName || 'N/A'}\nReason: ${reason || 'N/A'}\nItem Condition: ${itemCondition || 'N/A'}\n\nResolution Requested: ${resolution || 'N/A'}\n\nAdditional Details:\n${additionalDetails || 'N/A'}`;
      html = `<h3>New Return/Exchange Request</h3><h4>Customer Information</h4><p><strong>Name:</strong> ${fullName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><h4>Order Information</h4><p><strong>Order Number:</strong> ${orderNumber || 'N/A'}</p><p><strong>Order Date:</strong> ${orderDate || 'N/A'}</p><p><strong>Delivery Date:</strong> ${deliveryDate || 'N/A'}</p><h4>Product Details</h4><p><strong>Product Name:</strong> ${productName || 'N/A'}</p><p><strong>Reason:</strong> ${reason || 'N/A'}</p><p><strong>Item Condition:</strong> ${itemCondition || 'N/A'}</p><h4>Resolution Requested</h4><p><strong>${resolution || 'N/A'}</strong></p><h4>Additional Details</h4><p>${(additionalDetails || 'N/A').replace(/\n/g, '<br>')}</p>`;

      // override the default `to` to the configured receiver
      body._to = receiver;

    } else {
      const { name, email, phone, orderNumber, subject: reqSubject, message } = body;

      if (!name || !email || !reqSubject || !message) {
        return errorResponse('Please fill in all required fields', 400);
      }

      fromName = name;
      replyToEmail = email;
      subject = `Contact Form: ${reqSubject} from ${name}`;
      text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nOrder Number: ${orderNumber || 'N/A'}\n\nMessage:\n${message}`;
      html = `<h3>New Contact Message</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Order Number:</strong> ${orderNumber || 'N/A'}</p><p><strong>Subject:</strong> ${reqSubject}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`;
      // ensure recipient is the configured support inbox
      body._to = receiver;
    }

    const emailSent = await sendEmail({
      to: body._to,
      subject,
      text,
      html,
      fromName,
      replyTo: replyToEmail
    });

    if (emailSent) {
      return successResponse({ message: 'Email sent successfully' });
    } else {
      return errorResponse('Failed to send email', 500);
    }
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
