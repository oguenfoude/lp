import { NextRequest, NextResponse } from 'next/server';

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

    // Log safely (avoid printing PII in production)
    console.log('Order received:', {
      productName: orderData.productName,
      quantity: orderData.quantity,
      deliveryType: orderData.deliveryType,
      total: orderData.total,
    });

    return NextResponse.json({
      success: true,
      message: 'تم استلام الطلب بنجاح (بدون تكامل خارجي)'
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
