# 🛍️ Arabic Landing Page & Order System

A modern, production-ready Next.js 16 landing page with integrated order management for Arabic e-commerce. Features Google Sheets integration for order tracking and SMTP email notifications.

## ✨ Features

### 🎨 Frontend
- **Modern UI/UX** - Clean, responsive design with Arabic RTL support
- **Product Showcase** - Hero section with image gallery
- **Smart Order Form** - Dynamic delivery fees based on wilaya selection
- **Real-time Validation** - Client & server-side validation
- **Success Feedback** - Modal notifications with loading states
- **Mobile-First** - Fully responsive across all devices

### 🔧 Backend
- **Google Sheets Integration** - Automatic order logging with Arabic headers
- **SMTP Email Notifications** - Gmail integration for order alerts
- **Service Account Auth** - Secure JWT authentication for Google API
- **Error Handling** - Graceful fallbacks and detailed logging
- **Type Safety** - Full TypeScript coverage

### 🏗️ Tech Stack
- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI**: React 19, TailwindCSS 4, Radix UI
- **Backend**: Node.js with API Routes
- **Integrations**: Google Sheets API, Nodemailer (Gmail SMTP)
- **Language**: TypeScript
- **Styling**: CSS-in-JS with RTL support

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Gmail account with App Password enabled
- Google Cloud Service Account (for Sheets integration)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd lp
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Site Content
NEXT_PUBLIC_SITE_NAME="متجرك"
NEXT_PUBLIC_HERO_HEADLINE="عنوان رئيسي واضح"
NEXT_PUBLIC_PRODUCT_NAME="منتج طبيعي"
NEXT_PUBLIC_PRODUCT_PRICE="2990"
NEXT_PUBLIC_DELIVERY_TYPES="home:المنزل:500|office:المكتب:500"

# Contact
NEXT_PUBLIC_PHONE="0555123456"
NEXT_PUBLIC_WHATSAPP="0555123456"
NEXT_PUBLIC_EMAIL="contact@example.com"

# Google Sheets (Required)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-spreadsheet-id

# Gmail SMTP (Required)
SMTP_FROM_EMAIL=youremail@gmail.com
SMTP_PASSWORD=your-16-char-app-password
ORDER_NOTIFICATION_EMAIL=recipient@example.com

# Feature Flags
SHEETS_ENABLED=true
EMAIL_ENABLED=true
```

### 3. Google Sheets Setup

#### Create Service Account:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google Sheets API**
4. Go to **IAM & Admin** → **Service Accounts**
5. Click **Create Service Account**
6. Download JSON key file
7. Copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
8. Copy `private_key` → `GOOGLE_PRIVATE_KEY` (keep `\n` format)

#### Share Google Sheet:
1. Create a new Google Sheet
2. Copy the Sheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/[THIS-IS-THE-SHEET-ID]/edit
   ```
3. Click **Share** button
4. Add your service account email (from step 7 above)
5. **Set permission to "Editor"** ⚠️ (not Viewer)
6. Copy Sheet ID → `GOOGLE_SHEET_ID`

### 4. Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate App Password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Select **2-Step Verification**
   - Scroll to **App passwords**
   - Generate new app password
   - Copy the 16-character password (no spaces)
3. Add to `.env.local`:
   ```env
   SMTP_FROM_EMAIL=youremail@gmail.com
   SMTP_PASSWORD=abcdabcdabcdabcd  # 16 chars, no spaces
   ```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Test Order Flow

#### Test Sheets Connection:
Visit: `http://localhost:3000/api/test-sheets`

Expected response:
```json
{
  "status": "ok",
  "message": "الاتصال ناجح ✅",
  "details": {
    "title": "Your Sheet Name",
    "sheetCount": 1
  }
}
```

#### Submit Test Order:
1. Fill out the order form on homepage
2. Check your Google Sheet for new row with Arabic headers
3. Check recipient email for notification

---

## 📁 Project Structure

```
lp/
├── app/
│   ├── api/
│   │   ├── submit-order/
│   │   │   └── route.ts          # Order submission endpoint
│   │   └── test-sheets/
│   │       └── route.ts          # Sheets connection test
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles + RTL
│
├── components/
│   ├── sections/
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Gallery.tsx           # Product gallery
│   │   ├── OrderForm.tsx         # Main order form
│   │   ├── FAQ.tsx               # FAQ section
│   │   └── Footer.tsx            # Footer with contact
│   └── ui/                       # Shadcn UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── card.tsx
│
├── lib/
│   ├── server/
│   │   ├── sheets.ts             # Google Sheets integration
│   │   └── email.ts              # SMTP email service
│   ├── context/
│   │   └── OrderContext.tsx      # Global order state
│   ├── data/
│   │   ├── wilayas.ts            # Algeria wilayas data
│   │   └── site-data.ts          # Static content
│   └── utils.ts                  # Utility functions
│
├── types/
│   └── index.ts                  # TypeScript definitions
│
├── public/
│   └── images/                   # Static assets
│
├── .env.local                    # Your environment vars (not committed)
├── .env.example                  # Template for env vars
├── package.json
└── tsconfig.json
```

---

## 🔧 Configuration

### Delivery Types
Edit in `.env.local`:
```env
NEXT_PUBLIC_DELIVERY_TYPES="home:المنزل:500|office:المكتب:600|desk:المكتب:400"
```

Format: `id:label:fee|id:label:fee`

### Wilaya Data
Modify `lib/data/wilayas.ts` to customize delivery fees per region.

### Email Template
Edit `lib/server/email.ts` → `generateEmailHTML()` function.

### Google Sheets Columns
Modify `lib/server/sheets.ts` → `DESIRED_HEADERS` array for custom columns.

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

Add environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy

### Other Platforms
```bash
npm run build
npm start
```

Ensure environment variables are set in your hosting platform.

---

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### API Endpoints

#### `POST /api/submit-order`
Submit a new order.

**Request Body:**
```json
{
  "productName": "منتج طبيعي",
  "productPrice": 2990,
  "quantity": 1,
  "deliveryType": "home",
  "deliveryFee": 500,
  "total": 3490,
  "customerName": "أحمد محمد",
  "phone": "0555123456",
  "wilaya": "الجزائر",
  "baldia": "باب الوادي",
  "address": "شارع ديدوش مراد",
  "notes": "ملاحظات اختيارية"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم استلام الطلب بنجاح"
}
```

#### `GET /api/test-sheets`
Test Google Sheets connection.

**Response:**
```json
{
  "status": "ok",
  "message": "الاتصال ناجح ✅",
  "details": {
    "title": "Sheet Name",
    "sheetCount": 1,
    "firstSheetTitle": "الورقة1"
  }
}
```

---

## 🐛 Troubleshooting

### Google Sheets Errors

**403 Permission Denied**
- ✅ Verify service account has **Editor** permission (not Viewer)
- ✅ Check Sheet ID is correct
- ✅ Verify `GOOGLE_PRIVATE_KEY` includes `\n` characters

**Module Not Found: google-spreadsheet**
```bash
npm install google-spreadsheet google-auth-library
```

### SMTP Email Errors

**535 Authentication Failed**
- ✅ Enable 2FA on Gmail account
- ✅ Generate App Password (not regular password)
- ✅ Remove spaces from 16-char password
- ✅ Format: `SMTP_PASSWORD=abcdabcdabcdabcd`

**Connection Timeout**
- ✅ Check firewall allows port 465
- ✅ Verify `SMTP_FROM_EMAIL` matches Gmail account

### Build Errors

**TypeScript Errors**
```bash
npm run build
```
Check console for specific type errors.

**Module Resolution**
Verify `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 📝 Environment Variables Reference

### Required Public Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_NAME` | Store name | `"متجرك"` |
| `NEXT_PUBLIC_PRODUCT_NAME` | Product name | `"منتج طبيعي"` |
| `NEXT_PUBLIC_PRODUCT_PRICE` | Base price (DZD) | `"2990"` |
| `NEXT_PUBLIC_DELIVERY_TYPES` | Delivery options | `"home:المنزل:500"` |
| `NEXT_PUBLIC_PHONE` | Contact phone | `"0555123456"` |

### Required Server Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email | `account@project.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | Private key (with `\n`) | `"-----BEGIN PRIVATE KEY-----\n..."` |
| `GOOGLE_SHEET_ID` | Target spreadsheet ID | `"1abc...xyz"` |
| `SMTP_FROM_EMAIL` | Gmail sender | `"sender@gmail.com"` |
| `SMTP_PASSWORD` | Gmail App Password | `"abcdabcdabcdabcd"` |
| `ORDER_NOTIFICATION_EMAIL` | Order recipient | `"orders@example.com"` |

### Optional Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `SHEETS_ENABLED` | Enable Sheets integration | `"true"` |
| `EMAIL_ENABLED` | Enable email notifications | `"true"` |
| `NEXT_PUBLIC_LOGO_IMAGE` | Custom logo URL | Empty (uses local) |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram link | Empty (hidden) |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook link | Empty (hidden) |

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use Service Accounts** - Never use personal Google credentials
3. **Rotate Keys Regularly** - Update service account keys periodically
4. **Limit Sheet Access** - Only grant Editor permission to service account
5. **Use App Passwords** - Never use Gmail account password directly
6. **Environment-Specific Configs** - Use different sheets/emails for dev/prod

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📞 Support

For issues or questions:
- 📧 Email: oguenfoude@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/oguenfoude/lp/issues)

---

## 🙏 Acknowledgments

- Built with [Next.js 16](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Google Sheets integration via [google-spreadsheet](https://theoephraim.github.io/node-google-spreadsheet/)

---

**Made with ❤️ for Arabic e-commerce**
