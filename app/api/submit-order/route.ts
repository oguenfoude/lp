import { NextRequest, NextResponse } from 'next/server';
import { appendOrderToSheet } from '@/lib/server/sheets';
import { sendOrderEmail } from '@/lib/server/email';

/**
 * API Route: Submit Order (No external integrations)
 * - Validates payload
 * - Returns success immediately (suitable for MVP/local use)
 */

// ════════════════════════════════════════════════════════════════
// Types
// ════════════════════════════════════════════════════════════════

interface OrderData {
  // تم إزالة storeName و deliveryTime حسب الطلب
  productName: string;
  productPrice: number;
  quantity: number;
  deliveryType: string;
  deliveryFee: number;
  total: number;
  customerName: string;
  phone: string;
  wilaya: string;
  baldia: string;
  address?: string;
  notes?: string;
  color?: string; // اللون المختار للحذاء
  size?: string; // المقاس المختار للحذاء
}

// No external response types needed

// ════════════════════════════════════════════════════════════════
// POST Handler
// ════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();
    const validation = validateOrderData(orderData);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    // Environment flags
    const SHEETS_ENABLED = process.env.SHEETS_ENABLED === 'true';
    const EMAIL_ENABLED = process.env.EMAIL_ENABLED === 'true';

    // Prepare execution flow: save to Google Sheets first, then send email in background

    let sheetSaved = false;
    if (SHEETS_ENABLED) {
      const sheetId = process.env.GOOGLE_SHEET_ID || '';
      const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '';
      const privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
      try {
        await appendOrderToSheet(sheetId, clientEmail, privateKey, {
          timestamp: new Date().toISOString(),
          customerName: orderData.customerName,
          phone: orderData.phone,
          wilaya: orderData.wilaya,
          baldia: orderData.baldia,
          address: orderData.address || '',
          deliveryType: orderData.deliveryType,
          deliveryFee: orderData.deliveryFee,
          productName: orderData.productName,
          productPrice: orderData.productPrice,
          quantity: orderData.quantity,
          total: orderData.total,
          color: orderData.color || '',
          size: orderData.size || '',
        });
        sheetSaved = true;
      } catch (err) {
        console.error('Sheets operation setup failed:', err);
      }
    }

    if (EMAIL_ENABLED && sheetSaved) {
      const recipientEmail = process.env.ORDER_NOTIFICATION_EMAIL || '';
      // Fire-and-forget in background, do not block response
      Promise.resolve()
        .then(() =>
          sendOrderEmail(
            {
              customerName: orderData.customerName,
              phone: orderData.phone,
              wilaya: orderData.wilaya,
              baldia: orderData.baldia,
              address: orderData.address,
              deliveryType: orderData.deliveryType,
              deliveryFee: orderData.deliveryFee,
              productName: orderData.productName,
              productPrice: orderData.productPrice,
              quantity: orderData.quantity,
              total: orderData.total,
              color: orderData.color,
              size: orderData.size,
            },
            recipientEmail
          )
        )
        .catch((e) => console.error('Background email error:', e));
    }

    const sideEffectErrors: string[] = [];
    if (!sheetSaved && SHEETS_ENABLED) {
      sideEffectErrors.push('فشل حفظ الطلب في Google Sheets');
    }

    return NextResponse.json({
      success: true,
      message: sideEffectErrors.length
        ? 'تم استلام الطلب (مع ملاحظات)'
        : 'تم استلام الطلب بنجاح',
      sideEffectErrors: sideEffectErrors.length ? sideEffectErrors : undefined,
    });
  } catch (error) {
    console.error('Error submitting order:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء معالجة الطلب.' },
      { status: 500 }
    );
  }
}

// ════════════════════════════════════════════════════════════════
// Validation
// ════════════════════════════════════════════════════════════════

function validateOrderData(data: OrderData): { valid: boolean; error?: string } {
  const required = [
    'productName',
    'productPrice',
    'quantity',
    'deliveryType',
    'deliveryFee',
    'total',
    'customerName',
    'phone',
    'wilaya',
    'baldia',
  ];

  for (const field of required) {
    if (!data[field as keyof OrderData] && data[field as keyof OrderData] !== 0) {
      return { valid: false, error: `حقل مطلوب: ${field}` };
    }
  }

  // التحقق من رقم الهاتف
  const phone = String(data.phone).replace(/[^0-9]/g, '');
  if (phone.length !== 10 || !phone.match(/^0(5|6|7)\d{8}$/)) {
    return { valid: false, error: 'رقم هاتف غير صالح' };
  }

  // التحقق من الأرقام
  if (
    isNaN(data.productPrice) ||
    isNaN(data.quantity) ||
    isNaN(data.deliveryFee) ||
    isNaN(data.total)
  ) {
    return { valid: false, error: 'قيم رقمية غير صالحة' };
  }

  return { valid: true };
}

// No external send function — deliberately removed

// ════════════════════════════════════════════════════════════════
// GET Handler (للتحقق من أن الـ API يعمل)
// ════════════════════════════════════════════════════════════════

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Orders API is active (no external storage)',
  });
}
