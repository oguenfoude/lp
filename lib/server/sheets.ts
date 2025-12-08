import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

interface OrderRow {
  timestamp: string;
  customerName: string;
  phone: string;
  wilaya: string;
  baldia: string;
  address: string;
  deliveryType: string;
  deliveryFee: number;
  productName: string;
  productPrice: number;
  quantity: number;
  color: string;
  size: string;
  total: number;
}

const DESIRED_HEADERS = [
  'التاريخ والوقت',
  'اسم العميل',
  'رقم الهاتف',
  'الولاية',
  'البلدية',
  'العنوان',
  'نوع التوصيل',
  'رسوم التوصيل',
  'اسم المنتج',
  'سعر المنتج',
  'الكمية',
  'اللون',
  'المقاس',
  'المجموع الكلي',
];

async function initializeSheet(
  doc: GoogleSpreadsheet,
  sheetIndex: number = 0
): Promise<void> {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[sheetIndex];
    if (!sheet) {
      throw new Error(`Sheet at index ${sheetIndex} not found`);
    }

    // Try to load headers, catch if sheet is completely empty
    let existingHeaders: string[] = [];
    try {
      await sheet.loadHeaderRow();
      existingHeaders = sheet.headerValues || [];
    } catch {
      // Sheet is empty, no headers yet
      console.log('Sheet is empty, will initialize headers');
      existingHeaders = [];
    }

    // If no headers exist, set them
    if (existingHeaders.length === 0) {
      console.log('Setting up sheet headers...');
      await sheet.setHeaderRow(DESIRED_HEADERS);
      console.log('✅ Sheet headers initialized successfully');
      return;
    }

    // Verify headers match
    const headersMatch = DESIRED_HEADERS.every(
      (header, index) => existingHeaders[index] === header
    );

    if (!headersMatch) {
      console.warn('⚠️ Sheet headers do not match expected format');
      console.log('Expected:', DESIRED_HEADERS);
      console.log('Found:', existingHeaders);
    } else {
      console.log('✅ Sheet headers verified');
    }
  } catch (error) {
    console.error('❌ Error initializing sheet:', error);
    throw new Error(`Failed to initialize Google Sheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function appendOrderToSheet(
  sheetId: string,
  clientEmail: string,
  privateKey: string,
  order: OrderRow
): Promise<void> {
  if (!sheetId || !clientEmail || !privateKey) {
    throw new Error('Missing Google Sheets credentials');
  }

  const serviceAccountAuth = new JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

  await initializeSheet(doc);

  const sheet = doc.sheetsByIndex[0];

  const rowData = {
    'التاريخ والوقت': order.timestamp,
    'اسم العميل': order.customerName,
    'رقم الهاتف': order.phone,
    'الولاية': order.wilaya,
    'البلدية': order.baldia,
    'العنوان': order.address,
    'نوع التوصيل': order.deliveryType,
    'رسوم التوصيل': order.deliveryFee.toString(),
    'اسم المنتج': order.productName,
    'سعر المنتج': order.productPrice.toString(),
    'الكمية': order.quantity.toString(),
    'اللون': order.color,
    'المقاس': order.size,
    'المجموع الكلي': order.total.toString(),
  };

  await sheet.addRow(rowData);
  console.log('Order appended to Google Sheet successfully');
}
