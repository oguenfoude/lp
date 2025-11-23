# Landing Page Template (Arabic RTL / Env Driven)

Minimal, environment‑variable driven landing page with an order form tailored for Algeria (wilayas + phone validation). All textual content is configurable via `.env.local`; no marketing sentences are hardcoded.

---

## Core Points

- Next.js 15 (App Router), React 19, TypeScript strict
- Tailwind CSS + shadcn/ui primitives
- All text via env vars (`NEXT_PUBLIC_*`); safe server secrets remain non‑prefixed
- Algerian phone validation: 10 digits, starts with 05 / 06 / 07
- Wilayas list (editable in `lib/data/wilayas.ts`)
- Quantity + dynamic total calculation
- Delivery types now limited to: "التوصيل للمنزل" و "التوصيل للمكتب" (both fee configurable)
- Address field appears ONLY after selecting home delivery (not shown above the delivery choice)
- Delivery time line removed by default (can re‑enable easily)

---

## 📁 Project Structure

```
landing-page-template/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles + CSS variables
│
├── components/
│   ├── sections/
│   │   ├── Header.tsx      # Sticky header with logo + CTA
│   │   ├── Hero.tsx        # Hero section with headline + image
│   │   ├── Features.tsx    # Features grid (optional)
│   │   ├── OrderForm.tsx   # Order form with validation
│   │   └── Footer.tsx      # Footer with contact info
│   │
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       └── label.tsx
│
├── lib/
│   ├── data/
│   │   └── site-data.ts    # ALL content (from .env)
│   │
│   ├── config/
│   │   ├── site-config.ts  # Site settings (contact, social)
│   │   └── theme-config.ts # Colors & fonts
│   │
│   └── utils.ts            # Helper functions
│
├── types/
│   └── index.ts            # TypeScript interfaces
│
├── public/
│   └── images/
│       ├── logo/           # Logo images
│       └── main/           # Product images
│
├── .env.example            # Environment variables template
└── README.md               # This file
```

---

## Quick Start

### 1. Installation

The project is already initialized! Just install dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your values (example minimal Arabic):

```env
NEXT_PUBLIC_SITE_NAME="متجرك"
NEXT_PUBLIC_PRODUCT_NAME="منتج افتراضي"
NEXT_PUBLIC_PRODUCT_PRICE="2990"
NEXT_PUBLIC_DELIVERY_TYPES="home:التوصيل للمنزل:800:48-72 ساعة|office:التوصيل للمكتب:800:24-48 ساعة"
NEXT_PUBLIC_ORDER_ESTIMATED_PREFIX=""  # فارغ لإخفاء سطر التوقيت
NEXT_PUBLIC_PHONE="0555123456"
```

### 3. Replace Images (Optional)

Replace placeholder images with your actual images:

- **Logo**: `public/images/logo/logo.png` (recommended: 200x200px, PNG)
- **Product**: `public/images/main/hero-product.png` (recommended: 800x800px, PNG/JPG)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your landing page!

### 5. Build for Production

```bash
npm run build
npm start
```

---

## Customization

### Product Information

Edit `.env.local`:

```env
NEXT_PUBLIC_PRODUCT_NAME="New Product Name"
NEXT_PUBLIC_PRODUCT_PRICE="3500"  # in DZD
NEXT_PUBLIC_DELIVERY_FEE="600"

NEXT_PUBLIC_HERO_HEADLINE="New Headline Here"
NEXT_PUBLIC_HERO_SUBHEADLINE="New subheadline description"
```

Refresh browser → Changes apply immediately.

---

### Colors

Edit `lib/config/theme-config.ts`:

```typescript
export const themeConfig: ThemeConfig = {
  colors: {
    primary: "#8B5CF6",    // Purple (change to any hex color)
    secondary: "#10B981",  // Green
    accent: "#EC4899",     // Pink
    dark: "#1F2937",       // Text color
    light: "#F9FAFB",      // Background
  },
  // ...
};
```

---

### Toggle Features Section

In `.env.local`:

```env
NEXT_PUBLIC_SHOW_FEATURES="true"   # Show features section
NEXT_PUBLIC_SHOW_FEATURES="false"  # Hide features section
```

---

### Contact Information

In `.env.local`:

```env
NEXT_PUBLIC_PHONE="+213555999888"
NEXT_PUBLIC_WHATSAPP="+213555999888"
NEXT_PUBLIC_EMAIL="support@yourstore.com"

NEXT_PUBLIC_INSTAGRAM="https://instagram.com/yourstore"
NEXT_PUBLIC_FACEBOOK="https://facebook.com/yourstore"
```

---

### Features Bulk Format

In `.env.local`:

```env
NEXT_PUBLIC_FEATURE_1_ICON="✨"
NEXT_PUBLIC_FEATURE_1_TITLE="Fast Delivery"
NEXT_PUBLIC_FEATURE_1_DESC="We deliver in 24 hours"

# Add Feature 2, 3 similarly...
```

---

### RTL / Language

In `app/layout.tsx`, change line 37:

```tsx
// From:
<html lang="en" dir="ltr">

// To:
<html lang="ar" dir="rtl">
```

Then translate all text in `.env.local` to Arabic.

---

## Form Configuration

Included fields:

- الاسم (مطلوب، 3‑50 حرفاً)
- الهاتف (10 أرقام يبدأ بـ 05 أو 06 أو 07)
- الولاية + البلدية
- الكمية (عدد صحيح ≥ 1)
- نوع التوصيل (منزل / مكتب)
- العنوان (يظهر فقط عند اختيار "التوصيل للمنزل" ويجب ≥ 10 أحرف)
- ملاحظات (اختياري)

### Form Submission & Google Sheets

Already integrated with a Google Apps Script webhook via `/api/submit-order` route. Configure:

```
GSHEETS_WEBAPP_URL="<web app url>"
GSHEETS_SECRET_KEY="your-secret"
GSHEETS_SHEET_NAME="Orders"
INTEGRATION_ENABLED=true
```

Apps Script auto‑creates its spreadsheet and sheet if missing; address field only required for home delivery.

---

## Deployment

### Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local` in Vercel dashboard
5. Deploy! 🚀

### Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy! 🚀

---

## Dependencies

All dependencies are already installed:

```json
{
  "next": "^15.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "typescript": "^5.x",
  "tailwindcss": "^4.x",
  "lucide-react": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

---

## Troubleshooting

### Issue: Images not showing

**Solution**: Make sure images are in the correct folders:
- Logo: `public/images/logo/logo.png`
- Product: `public/images/main/hero-product.png`

### Issue: Environment variables not updating

**Solution**: 
1. Restart dev server (`Ctrl+C` then `npm run dev`)
2. Clear browser cache
3. Make sure variable names start with `NEXT_PUBLIC_`

### Issue: Phone validation not working

**Solution**: Ensure phone format is:
Format accepted: `0555XXXXXX`, `0655XXXXXX`, `0755XXXXXX` (10 digits). International prefix not required.

### Issue: Form not submitting

**Solution**: 
1. Check browser console for errors
2. Verify all required fields are filled
3. Ensure phone number matches Algerian format

---

## Notes

Delivery time line removed by default. To re-enable, set `NEXT_PUBLIC_ORDER_ESTIMATED_PREFIX` and (optionally) restore the JSX block in `OrderForm.tsx`.

---

## Extensibility

Add new delivery types by appending to `NEXT_PUBLIC_DELIVERY_TYPES` using the pattern:

```
id:label:fee:time|id2:label2:fee2:time2
```

---

## Security Notes

- ✅ All form inputs are validated
- ✅ TypeScript prevents type errors
- ✅ No sensitive data stored (currently)
- ⚠️ Add authentication before production if storing user data
- ⚠️ Use HTTPS in production

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## Basic Ops

Need help customizing? Common tasks:

1. **Change colors** → `lib/config/theme-config.ts`
2. **Change text** → `.env.local`
3. **Add section** → Create new component in `components/sections/`
4. **Remove section** → Comment out in `app/page.tsx`

---

## License

This is a template project. Feel free to use it for any commercial or personal project.

---

## Final Checklist

Before launching:

- [ ] Replace placeholder images with real images
- [ ] Fill all environment variables in `.env.local`
- [ ] Test form submission
- [ ] Test on mobile device
- [ ] Update contact information
- [ ] Update social media links
- [ ] Test phone validation
- [ ] Check responsive design (320px, 768px, 1024px)
- [ ] Run `npm run build` to verify no errors
- [ ] Deploy to Vercel/Netlify
- [ ] Add environment variables to hosting platform
- [ ] Test production deployment

---

## 🎉 You're Ready!

Your landing page template is complete and production-ready.

**Quick Commands:**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check for code issues
```

**Happy selling! 🚀**
