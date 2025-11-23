import { NextRequest, NextResponse } from 'next/server';

/**
 * ════════════════════════════════════════════════════════════════
 * API Route: Submit Order to Google Sheets
 * ════════════════════════════════════════════════════════════════
 * 
 * هذا الـ Route يستقبل الطلبات من النموذج ويرسلها لـ Google Sheets
 * بشكل آمن (المفاتيح السرية على السيرفر فقط)
 * 
 * ════════════════════════════════════════════════════════════════
 */

// قراءة الإعدادات من Environment Variables
const GSHEETS_CONFIG = {
  webappUrl: process.env.GSHEETS_WEBAPP_URL || '',
  secretKey: process.env.GSHEETS_SECRET_KEY || '',
  sheetName: process.env.GSHEETS_SHEET_NAME || 'Orders',
  timeout: parseInt(process.env.INTEGRATION_TIMEOUT_MS || '8000'),
  retryAttempts: parseInt(process.env.INTEGRATION_RETRY_ATTEMPTS || '2'),
  enabled: process.env.INTEGRATION_ENABLED === 'true',
  debug: process.env.INTEGRATION_DEBUG === 'true',
};

// ════════════════════════════════════════════════════════════════
// Types
// ════════════════════════════════════════════════════════════════

interface OrderData {
  storeName: string;
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
  deliveryTime: string;
}

interface GSheetsResponse {
  success: boolean;
  message: string;
  data?: {
    orderId: string;
    timestamp: string;
  };
}

// ════════════════════════════════════════════════════════════════
// POST Handler
// ════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    // التحقق من تفعيل التكامل
    if (!GSHEETS_CONFIG.enabled) {
      if (GSHEETS_CONFIG.debug) {
        console.log('Integration disabled - order not sent to Google Sheets');
      }
      return NextResponse.json({
        success: true,
        message: 'تم استلام الطلب (وضع التطوير)',
        local: true,
      });
    }

    // التحقق من وجود الإعدادات المطلوبة
    if (!GSHEETS_CONFIG.webappUrl || !GSHEETS_CONFIG.secretKey) {
      console.error('Missing Google Sheets configuration');
      return NextResponse.json(
        { 
          success: false, 
          message: 'خطأ في إعدادات الخادم' 
        },
        { status: 500 }
      );
    }

    // قراءة بيانات الطلب
    const orderData: OrderData = await request.json();

    // التحقق من صحة البيانات
    const validation = validateOrderData(orderData);
    if (!validation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          message: validation.error 
        },
        { status: 400 }
      );
    }

    // إرسال الطلب إلى Google Sheets
    const result = await sendOrderToGSheets(orderData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'تم حفظ الطلب بنجاح',
        orderId: result.data?.orderId,
      });
    } else {
      throw new Error(result.message);
    }

  } catch (error) {
    console.error('Error submitting order:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.' 
      },
      { status: 500 }
    );
  }
}

// ════════════════════════════════════════════════════════════════
// Validation
// ════════════════════════════════════════════════════════════════

function validateOrderData(data: OrderData): { valid: boolean; error?: string } {
  const required = [
    'storeName',
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

// ════════════════════════════════════════════════════════════════
// Send to Google Sheets
// ════════════════════════════════════════════════════════════════

async function sendOrderToGSheets(data: OrderData): Promise<GSheetsResponse> {
  const payload = {
    ...data,
    secretKey: GSHEETS_CONFIG.secretKey,
    sheetName: GSHEETS_CONFIG.sheetName,
  };

  let lastError: Error | null = null;

  // محاولة الإرسال (مع إعادة المحاولة)
  for (let attempt = 1; attempt <= GSHEETS_CONFIG.retryAttempts; attempt++) {
    try {
      if (GSHEETS_CONFIG.debug) {
        console.log(`Attempt ${attempt} - Sending order to Google Sheets...`);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GSHEETS_CONFIG.timeout);

      const response = await fetch(GSHEETS_CONFIG.webappUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: GSheetsResponse = await response.json();

      if (GSHEETS_CONFIG.debug) {
        console.log('Google Sheets response:', result);
      }

      return result;

    } catch (error) {
      lastError = error as Error;
      
      if (GSHEETS_CONFIG.debug) {
        console.error(`Attempt ${attempt} failed:`, error);
      }

      // الانتظار قبل إعادة المحاولة (إلا في المحاولة الأخيرة)
      if (attempt < GSHEETS_CONFIG.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  // فشلت كل المحاولات
  return {
    success: false,
    message: lastError?.message || 'فشل الاتصال بـ Google Sheets',
  };
}

// ════════════════════════════════════════════════════════════════
// GET Handler (للتحقق من أن الـ API يعمل)
// ════════════════════════════════════════════════════════════════

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Orders API is active',
    config: {
      enabled: GSHEETS_CONFIG.enabled,
      configured: !!GSHEETS_CONFIG.webappUrl && !!GSHEETS_CONFIG.secretKey,
    },
  });
}
