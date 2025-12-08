import nodemailer from 'nodemailer';

interface OrderEmailData {
  customerName: string;
  phone: string;
  wilaya: string;
  baldia: string;
  address?: string;
  deliveryType: string;
  deliveryFee: number;
  productName: string;
  productPrice: number;
  quantity: number;
  color: string;
  size: string;
  total: number;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ar-DZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function generateEmailHTML(order: OrderEmailData): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>طلب جديد</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; direction: rtl;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background-color: #4a5568; color: #ffffff; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">طلب جديد</h1>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #2d3748; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">معلومات العميل</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">الاسم:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">الهاتف:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">الولاية:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.wilaya}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">البلدية:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.baldia}</td>
        </tr>
        ${order.address ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">العنوان:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.address}</td>
        </tr>` : ''}
      </table>

      <h2 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">تفاصيل الطلب</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">المنتج:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.productName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">السعر:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${formatPrice(order.productPrice)} دج</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">الكمية:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.quantity}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">اللون:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.color}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">المقاس:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.size}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">نوع التوصيل:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${order.deliveryType}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">رسوم التوصيل:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${formatPrice(order.deliveryFee)} دج</td>
        </tr>
      </table>

      <div style="background-color: #edf2f7; padding: 15px; border-radius: 6px; margin-top: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #2d3748;">المجموع الكلي</h3>
        <p style="margin: 0; font-size: 28px; font-weight: bold; color: #2c5282;">${formatPrice(order.total)} دج</p>
      </div>
    </div>
    <div style="background-color: #f7fafc; padding: 15px; text-align: center; color: #718096; font-size: 14px;">
      <p style="margin: 0;">هذا البريد الإلكتروني تم إنشاؤه تلقائياً من نظام الطلبات</p>
    </div>
  </div>
</body>
</html>
  `;
}

async function sendViaSMTP(
  recipientEmail: string,
  subject: string,
  html: string
): Promise<void> {
  const user = process.env.SMTP_FROM_EMAIL || '';
  const pass = process.env.SMTP_PASSWORD || '';
  if (!user || !pass) {
    throw new Error('Missing SMTP_FROM_EMAIL or SMTP_PASSWORD');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to: recipientEmail,
    subject,
    html,
  });

  console.log('Email sent via SMTP');
}

export async function sendOrderEmail(
  order: OrderEmailData,
  recipientEmail: string
): Promise<void> {
  const subject = `طلب جديد من ${order.customerName}`;
  const html = generateEmailHTML(order);

  await sendViaSMTP(recipientEmail, subject, html);
}
