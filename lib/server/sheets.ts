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
  'المجموع الكلي',
];

async function initializeSheet(
  doc: GoogleSpreadsheet,
  sheetIndex: number = 0
): Promise<void> {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[sheetIndex];
  if (!sheet) {
    throw new Error(`Sheet at index ${sheetIndex} not found`);
  }

  await sheet.loadHeaderRow();
  const existingHeaders = sheet.headerValues;

  if (existingHeaders.length === 0) {
    await sheet.setHeaderRow(DESIRED_HEADERS);
    console.log('Initialized sheet with Arabic headers');
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
    'المجموع الكلي': order.total.toString(),
  };

  await sheet.addRow(rowData);
  console.log('Order appended to Google Sheet successfully');
}
