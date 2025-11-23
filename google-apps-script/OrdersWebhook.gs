/**
 * ════════════════════════════════════════════════════════════════
 * Google Sheets Orders Webhook - AUTO SETUP VERSION
 * ════════════════════════════════════════════════════════════════
 * 
 * هذا السكربت يستقبل الطلبات ويحفظها تلقائياً - لا حاجة لإعداد شيت مسبقاً!
 * 
 * الإعداد السريع:
 * 1. انسخ هذا الكود بالكامل
 * 2. افتح script.google.com/home
 * 3. New Project > الصق الكود
 * 4. Deploy > New deployment > Web app
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Deploy واحفظ الرابط
 * 
 * ✅ الشيت سينشأ تلقائياً عند أول طلب!
 * 
 * ════════════════════════════════════════════════════════════════
 */

// ════════════════════════════════════════════════════════════════
// إعدادات (عدّلها حسب حاجتك)
// ════════════════════════════════════════════════════════════════

const CONFIG = {
  // اسم الورقة الافتراضية
  DEFAULT_SHEET_NAME: 'Orders',
  
  // المنطقة الزمنية
  TIMEZONE: 'Africa/Algiers',
  
  // مفتاح أمان بسيط (اختياري - غيّره لمفتاح خاص بك)
  // إذا تريد تعطيل الحماية، اجعله فارغاً: ''
  SECRET_KEY: 'change-this-secret-key-2025',
  
  // تفعيل السجل التفصيلي (للتطوير فقط)
  DEBUG_MODE: false,
  
  // اسم الشيت الرئيسي (سيُنشأ تلقائياً إن لم يوجد)
  MAIN_SPREADSHEET_NAME: 'Landing Pages Orders'
};

// ════════════════════════════════════════════════════════════════
// أسماء الأعمدة (يجب أن تكون نفس ترتيب الصف الأول في الشيت)
// ════════════════════════════════════════════════════════════════

const COLUMNS = [
  'timestamp',        // وقت الطلب
  // تمت إزالة order_id و store_name و delivery_time حسب الطلب
  'product_name',     // اسم المنتج
  'product_price',    // سعر المنتج
  'quantity',         // الكمية
  'delivery_type',    // نوع التوصيل (المنزل/المكتب)
  'delivery_fee',     // رسوم التوصيل
  'total',            // الإجمالي
  'customer_name',    // اسم العميل
  'phone',            // رقم الهاتف
  'wilaya',           // الولاية
  'baldia',           // البلدية
  'address',          // العنوان
  'notes',            // ملاحظات
  'status'            // حالة الطلب (جديد)
];

// ════════════════════════════════════════════════════════════════
// دالة رئيسية: استقبال الطلبات (POST)
// ════════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    // تسجيل الطلب الوارد
    if (CONFIG.DEBUG_MODE) {
      Logger.log('Incoming request: ' + JSON.stringify(e));
    }
    
    // التحقق من وجود بيانات
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse(false, 'No data received');
    }
    
    // تحويل JSON إلى كائن
    const data = JSON.parse(e.postData.contents);
    
    // التحقق من المفتاح السري (إذا مفعّل)
    if (CONFIG.SECRET_KEY && data.secretKey !== CONFIG.SECRET_KEY) {
      Logger.log('Invalid secret key');
      return createResponse(false, 'Unauthorized');
    }
    
    // التحقق من البيانات المطلوبة
    const validation = validateOrderData(data);
    if (!validation.valid) {
      return createResponse(false, 'Invalid data: ' + validation.error);
    }
    
    // الحصول على الشيت المناسب
    const sheetName = data.sheetName || CONFIG.DEFAULT_SHEET_NAME;
    const sheet = getOrCreateSheet(sheetName);
    
    // إضافة الطلب
    addOrderToSheet(sheet, data);
    
    // رد ناجح (تمت إزالة orderId من الرد)
    return createResponse(true, 'Order saved successfully', {
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse(false, 'Server error: ' + error.message);
  }
}

// ════════════════════════════════════════════════════════════════
// دالة: التحقق من صحة البيانات
// ════════════════════════════════════════════════════════════════

function validateOrderData(data) {
  // الحقول المطلوبة
  const required = [
    // تمت إزالة storeName
    'productName',
    'productPrice',
    'quantity',
    'deliveryType',
    'deliveryFee',
    'total',
    'customerName',
    'phone',
    'wilaya',
    'baldia'
  ];
  
  // التحقق من وجود الحقول
  for (let field of required) {
    if (!data[field] && data[field] !== 0) {
      return { valid: false, error: `Missing field: ${field}` };
    }
  }
  
  // التحقق من رقم الهاتف (10 أرقام)
  const phone = String(data.phone).replace(/[^0-9]/g, '');
  if (phone.length !== 10 || !phone.match(/^0(5|6|7)\d{8}$/)) {
    return { valid: false, error: 'Invalid phone number' };
  }
  
  // التحقق من الأرقام
  if (isNaN(data.productPrice) || isNaN(data.quantity) || isNaN(data.deliveryFee) || isNaN(data.total)) {
    return { valid: false, error: 'Invalid numeric values' };
  }
  
  return { valid: true };
}

// ════════════════════════════════════════════════════════════════
// دالة: الحصول على الـ Spreadsheet الرئيسي أو إنشاؤه تلقائياً
// ════════════════════════════════════════════════════════════════

function getOrCreateSpreadsheet() {
  // محاولة الحصول على معرف الشيت المحفوظ
  const scriptProps = PropertiesService.getScriptProperties();
  let spreadsheetId = scriptProps.getProperty('MAIN_SPREADSHEET_ID');
  
  let ss = null;
  
  // إذا كان هناك معرف محفوظ، حاول فتحه
  if (spreadsheetId) {
    try {
      ss = SpreadsheetApp.openById(spreadsheetId);
      if (CONFIG.DEBUG_MODE) {
        Logger.log('Using existing spreadsheet: ' + ss.getUrl());
      }
    } catch (e) {
      // الشيت المحفوظ غير موجود أو محذوف
      Logger.log('Saved spreadsheet not found, creating new one...');
      spreadsheetId = null;
    }
  }
  
  // إذا لم يوجد، أنشئ شيت جديد
  if (!ss) {
    const timestamp = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd');
    const newName = CONFIG.MAIN_SPREADSHEET_NAME + ' - ' + timestamp;
    
    ss = SpreadsheetApp.create(newName);
    spreadsheetId = ss.getId();
    
    // احفظ المعرف للاستخدام المستقبلي
    scriptProps.setProperty('MAIN_SPREADSHEET_ID', spreadsheetId);
    
    Logger.log('✅ Created new spreadsheet: ' + ss.getUrl());
    Logger.log('📋 Spreadsheet ID: ' + spreadsheetId);
    
    // حذف الورقة الافتراضية (Sheet1) إذا وجدت
    const defaultSheet = ss.getSheetByName('Sheet1');
    if (defaultSheet && ss.getSheets().length > 1) {
      ss.deleteSheet(defaultSheet);
    }
  }
  
  return ss;
}

// ════════════════════════════════════════════════════════════════
// دالة: الحصول على الورقة أو إنشاؤها
// ════════════════════════════════════════════════════════════════

function getOrCreateSheet(sheetName) {
  // الحصول على الـ Spreadsheet الرئيسي (أو إنشاؤه)
  const ss = getOrCreateSpreadsheet();
  
  let sheet = ss.getSheetByName(sheetName);
  
  // إذا لم توجد، أنشئها
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    // إضافة صف الرأس
    const headers = COLUMNS.map(col => {
      // ترجمة الأعمدة للعربية
      const translations = {
        'timestamp': 'التاريخ والوقت',
        // تمت إزالة رقم الطلب واسم المتجر
        'product_name': 'المنتج',
        'product_price': 'السعر',
        'quantity': 'الكمية',
        'delivery_type': 'نوع التوصيل',
        'delivery_fee': 'رسوم التوصيل',
        'total': 'الإجمالي',
        'customer_name': 'اسم العميل',
        'phone': 'الهاتف',
        'wilaya': 'الولاية',
        'baldia': 'البلدية',
        'address': 'العنوان',
        'notes': 'ملاحظات',
        // تمت إزالة وقت التوصيل
        'status': 'الحالة'
      };
      return translations[col] || col;
    });
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // تنسيق صف الرأس
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#000000');
    headerRange.setFontColor('#ffffff');
    headerRange.setHorizontalAlignment('center');
    
    // تجميد الصف الأول
    sheet.setFrozenRows(1);
    
    // ضبط عرض الأعمدة تلقائياً
    sheet.autoResizeColumns(1, headers.length);
  }
  
  return sheet;
}

// ════════════════════════════════════════════════════════════════
// دالة: إضافة الطلب إلى الشيت
// ════════════════════════════════════════════════════════════════

function addOrderToSheet(sheet, data) {
  // إعداد الصف (بدون رقم طلب واسم متجر ووقت التوصيل)
  const timestamp = Utilities.formatDate(
    new Date(), 
    CONFIG.TIMEZONE, 
    'yyyy-MM-dd HH:mm:ss'
  );
  
  const row = [
    timestamp,
    data.productName || '',
    Number(data.productPrice) || 0,
    Number(data.quantity) || 1,
    data.deliveryType || '',
    Number(data.deliveryFee) || 0,
    Number(data.total) || 0,
    data.customerName || '',
    data.phone || '',
    data.wilaya || '',
    data.baldia || '',
    data.address || '',
    data.notes || '',
    'جديد'
  ];
  
  sheet.appendRow(row);
  
  const lastRow = sheet.getLastRow();
  const range = sheet.getRange(lastRow, 1, 1, row.length);
  if (lastRow % 2 === 0) {
    range.setBackground('#f9f9f9');
  }
  sheet.getRange(lastRow, 3, 1, 5).setHorizontalAlignment('right');
  if (CONFIG.DEBUG_MODE) {
    Logger.log('Order added at row ' + lastRow);
  }
}

// ════════════════════════════════════════════════════════════════
// دالة: توليد رقم طلب فريد
// ════════════════════════════════════════════════════════════════

// تم حذف توليد رقم الطلب generateOrderId

// ════════════════════════════════════════════════════════════════
// دالة: إنشاء رد JSON
// ════════════════════════════════════════════════════════════════

function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ════════════════════════════════════════════════════════════════
// دالة اختبار: استدعاء يدوي للتجربة
// ════════════════════════════════════════════════════════════════

function testWebhook() {
  const testData = {
    secretKey: CONFIG.SECRET_KEY,
    productName: 'منتج تجريبي',
    productPrice: 2990,
    quantity: 1,
    deliveryType: 'المنزل',
    deliveryFee: 500,
    total: 3490,
    customerName: 'أحمد محمد',
    phone: '0555123456',
    wilaya: 'الجزائر',
    baldia: 'باب الوادي',
    address: 'شارع الاستقلال، رقم 123',
    notes: 'طلب تجريبي'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

// ════════════════════════════════════════════════════════════════
// دالة: GET (للتحقق من أن الـ webhook يعمل + عرض رابط الشيت)
// ════════════════════════════════════════════════════════════════

function doGet(e) {
  try {
    const ss = getOrCreateSpreadsheet();
    const url = ss.getUrl();
    const id = ss.getId();
    
    return createResponse(true, 'Orders Webhook is active and ready!', {
      spreadsheetUrl: url,
      spreadsheetId: id,
      status: 'operational'
    });
  } catch (error) {
    return createResponse(false, 'Error: ' + error.message);
  }
}

// ════════════════════════════════════════════════════════════════
// دالة إضافية: الحصول على رابط الشيت (يدوياً)
// ════════════════════════════════════════════════════════════════

function getSpreadsheetUrl() {
  const ss = getOrCreateSpreadsheet();
  const url = ss.getUrl();
  Logger.log('📊 Spreadsheet URL: ' + url);
  Logger.log('📋 Spreadsheet ID: ' + ss.getId());
  return url;
}
