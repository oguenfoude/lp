# Codebase Review & Documentation

## Overview
This is a Next.js 15 landing page template designed for Algerian e-commerce, with full Arabic RTL support and environment-driven configuration.

## Architecture

### Technology Stack
- **Framework**: Next.js 15.0.3 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x (Strict mode)
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Validation**: Zod 4.x

### Project Structure
```
lp/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles + CSS variables
│   └── api/
│       └── submit-order/   # Order submission API route
│
├── components/
│   ├── sections/           # Page sections
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
│   │   ├── site-data.ts    # Content from .env
│   │   └── wilayas.ts      # Algerian provinces
│   │
│   ├── config/
│   │   ├── site-config.ts  # Site settings
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
└── google-apps-script/     # Google Sheets integration
```

## Key Features

### 1. Environment-Driven Content
All text content is configurable via `.env.local` with `NEXT_PUBLIC_*` variables. No hardcoded marketing text.

**Key Variables:**
- Site info: `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_DESCRIPTION`
- Hero section: `NEXT_PUBLIC_HERO_HEADLINE`, `NEXT_PUBLIC_HERO_SUBHEADLINE`
- Product: `NEXT_PUBLIC_PRODUCT_NAME`, `NEXT_PUBLIC_PRODUCT_PRICE`
- Delivery: `NEXT_PUBLIC_DELIVERY_TYPES` (composite format: `id:label:fee:time|...`)
- Contact: `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`

### 2. Algerian Market Specifics
- **Wilayas**: Complete list of 58 Algerian provinces
- **Phone Validation**: 10 digits, must start with 05, 06, or 07
- **Currency**: DZD (Dinar Algérien)
- **Language**: Arabic RTL by default

### 3. Order Form
**Fields:**
- الاسم (Name): 3-50 characters
- الهاتف (Phone): Algerian format validation
- الولاية (Wilaya): Dropdown selection
- البلدية (Baldia/Commune): Text input
- الكمية (Quantity): Integer >= 1
- نوع التوصيل (Delivery Type): Radio buttons
- العنوان (Address): Only shown for home delivery, min 10 chars
- ملاحظات (Notes): Optional

**Validation:**
- Client-side: Zod schema validation
- Real-time feedback
- Conditional fields (address only for home delivery)

### 4. Google Sheets Integration
Orders are automatically sent to Google Sheets via API route:
- Endpoint: `/api/submit-order`
- Method: POST
- Integration: Google Apps Script webhook
- Auto-creates spreadsheet and sheet if missing

**Environment Variables:**
```env
GSHEETS_WEBAPP_URL="<your-webapp-url>"
GSHEETS_SECRET_KEY="your-secret"
GSHEETS_SHEET_NAME="Orders"
INTEGRATION_ENABLED=true
```

## Color Scheme

### Brand Colors (Warm Earthy Palette)
The application uses a cohesive warm, earthy color palette inspired by natural tones:

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| **Doctor** | #f7f7f7 | `--color-light` | Main backgrounds, light areas |
| **Jupiter** | #e4dfdf | `--color-jupiter` | Secondary backgrounds (footer) |
| **Summer's End** | #e19371 | `--color-accent` | Warm accents, icons, highlights |
| **Caramel Dream** | #ba6544 | `--color-primary` | Primary buttons, CTAs |
| **Peanut** | #784437 | `--color-peanut` | Rich brown for text, borders |
| **Italian Roast** | #2b100f | `--color-dark` | Main text, headings |
| **Espresso** | #502f2a | `--color-secondary` | Button hover, secondary elements |

### Color Application

**Header:**
- Background: White with transparency
- Logo text: `var(--color-dark)` (Italian Roast)
- CTA button: `var(--color-primary)` → `var(--color-secondary)` on hover

**Hero Section:**
- Background: `var(--color-light)` (Doctor)
- Headline: `var(--color-dark)` (Italian Roast)
- Subheadline: `var(--color-peanut)` (Peanut)
- CTA button: `var(--color-primary)` → `var(--color-secondary)` on hover
- Trust indicators check: `var(--color-accent)` (Summer's End)

**Order Form:**
- Selected delivery option border: `var(--color-primary)`
- Submit button: `var(--color-dark)` → `var(--color-secondary)` on hover

**Footer:**
- Background: `var(--color-jupiter)` (Jupiter)
- Headings: `var(--color-dark)` (Italian Roast)
- Text: `var(--color-peanut)` (Peanut)
- Icons: `var(--color-accent)`, `var(--color-primary)`
- Links: `var(--color-peanut)` → `var(--color-primary)` on hover
- Border: `var(--color-peanut)` with 20% opacity

### CSS Variables Location
All CSS variables are defined in `app/globals.css`:
```css
:root {
  --background: #f7f7f7;
  --foreground: #2b100f;
  --color-primary: #ba6544;
  --color-secondary: #502f2a;
  --color-accent: #e19371;
  --color-dark: #2b100f;
  --color-light: #f7f7f7;
  --color-jupiter: #e4dfdf;
  --color-peanut: #784437;
}
```

## Component Details

### Header (`components/sections/Header.tsx`)
- **Type**: Client component ("use client")
- **State**: Tracks scroll position for sticky header effect
- **Features**: Logo, site name, CTA button
- **Responsive**: Adjusts padding and logo size on scroll

### Hero (`components/sections/Hero.tsx`)
- **Type**: Client component
- **Layout**: 2-column grid (text + image)
- **Features**: Headline, subheadline, CTA, trust indicators
- **Responsive**: Stacks vertically on mobile

### OrderForm (`components/sections/OrderForm.tsx`)
- **Type**: Client component
- **State Management**: Form data, errors, submission status
- **Validation**: Zod schema with Algerian-specific rules
- **Dynamic Features**:
  - Address field shown only for home delivery
  - Real-time price calculation
  - Quantity multiplier
  - Delivery fee calculation

### Footer (`components/sections/Footer.tsx`)
- **Type**: Server component
- **Features**: Contact info, social links, copyright
- **Responsive**: 2-column grid → single column on mobile

## Configuration Files

### `lib/config/theme-config.ts`
Centralized theme configuration:
```typescript
export const themeConfig: ThemeConfig = {
  colors: {
    primary: "#ba6544",    // Caramel Dream
    secondary: "#502f2a",  // Espresso
    accent: "#e19371",     // Summer's End
    dark: "#2b100f",       // Italian Roast
    light: "#f7f7f7",      // Doctor
  },
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
  borderRadius: "0.5rem",
};
```

### `lib/config/site-config.ts`
Site-wide settings from environment variables:
```typescript
export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "متجر افتراضي",
  phone: process.env.NEXT_PUBLIC_PHONE || "+213555123456",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+213555123456",
  email: process.env.NEXT_PUBLIC_EMAIL || "contact@example.com",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "",
    twitter: process.env.NEXT_PUBLIC_TWITTER || "",
  },
};
```

### `lib/data/site-data.ts`
Content parsing and fallbacks:
- Parses environment variables into structured data
- Provides Arabic fallback text
- Handles delivery types parsing (composite format)
- Processes feature lists and trust indicators

## Data Flow

### Content Flow
1. Environment variables → `site-data.ts` → Components
2. Type-safe with TypeScript interfaces
3. Fallback values for all content

### Form Submission Flow
1. User fills form → Client-side validation (Zod)
2. Submit → `/api/submit-order` route
3. API validates and forwards to Google Apps Script
4. Google Script processes and stores in Google Sheets
5. Success/error response to user

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

### Key Responsive Features
- Container with max-width 1200px
- Grid layouts adapt: 2-column → 1-column
- Header logo scales with scroll
- Form layout optimized for mobile
- Touch-friendly tap targets (min 44px)

## Localization (Arabic RTL)

### Configuration
In `app/layout.tsx`:
```tsx
<html lang="ar" dir="rtl">
```

### RTL Support
- Tailwind automatically flips directional utilities
- Custom CSS respects `dir="rtl"`
- Forms and inputs properly aligned
- Icons positioned correctly

## Performance Optimizations

1. **Next.js Image Optimization**: Uses `next/image` with `unoptimized` flag for external images
2. **Font Loading**: Inter font with `display: swap`
3. **Code Splitting**: Automatic with App Router
4. **Static Generation**: Most pages can be statically generated
5. **CSS Variables**: Efficient theme switching without JavaScript

## Security Considerations

### Current Implementation
- ✅ Input validation (client + server)
- ✅ TypeScript type safety
- ✅ Environment variables for secrets
- ✅ CORS headers on API routes

### Recommended Additions
- ⚠️ Add CSRF protection
- ⚠️ Implement rate limiting on form submissions
- ⚠️ Use HTTPS in production
- ⚠️ Add honeypot field for spam prevention
- ⚠️ Validate phone numbers server-side

## Deployment

### Recommended Platforms
1. **Vercel** (Optimal for Next.js)
2. **Netlify**
3. **Railway**
4. **Fly.io**

### Environment Variables Setup
All `NEXT_PUBLIC_*` variables must be added to deployment platform's environment variables section.

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

## Customization Guide

### Changing Colors
1. Edit `lib/config/theme-config.ts`
2. Update `app/globals.css` CSS variables
3. Colors automatically apply throughout the app

### Adding New Content
1. Add environment variable to `.env.local`
2. Access via `process.env.NEXT_PUBLIC_*`
3. Add to `site-data.ts` for structured access

### Adding New Form Field
1. Add to TypeScript interface in `types/index.ts`
2. Add validation in `OrderForm.tsx` Zod schema
3. Add form field JSX
4. Update Google Sheets script to handle new field

### Modifying Delivery Types
Update `NEXT_PUBLIC_DELIVERY_TYPES` in `.env.local`:
```
id:label:fee:time|id2:label2:fee2:time2
```

## Testing

### Manual Testing Checklist
- [ ] Form validation (all fields)
- [ ] Phone number format (Algerian)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] RTL layout correctness
- [ ] Form submission to Google Sheets
- [ ] Error handling
- [ ] Loading states
- [ ] Cross-browser compatibility

### Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

## Known Limitations

1. **Google Fonts**: Build may fail if Google Fonts API is blocked
2. **External Images**: Placeholder images from placehold.co may be blocked
3. **No Authentication**: Form is public and unprotected
4. **No Payment Integration**: Orders are collected, not processed
5. **Single Language**: Currently Arabic only (can be extended)

## Future Enhancements

### Potential Features
1. Multi-language support (Arabic/French)
2. Payment gateway integration
3. User accounts and order tracking
4. Product catalog with multiple items
5. Inventory management
6. Email notifications
7. SMS confirmation
8. Admin dashboard
9. Analytics integration
10. A/B testing capability

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and update wilaya list if Algeria adds provinces
- Monitor form submissions for spam
- Update placeholder images with real product images
- Review and optimize Core Web Vitals

### Code Quality
- TypeScript strict mode enforced
- ESLint configuration included
- Component-based architecture for maintainability
- Clear separation of concerns (data/config/components)

## Support & Documentation

### Key Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)

### Getting Help
- Check README.md for quick setup
- Review SETUP-GUIDE.md for detailed instructions
- Check QUICK-SETUP.md for fast deployment

---

**Last Updated**: November 23, 2025
**Version**: 1.0.0
**Author**: Landing Page Template Team
