# lp — Next.js Arabic E-commerce Landing Page

## Project Type
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Production-ready Arabic e-commerce landing page with Google Sheets order logging + Gmail SMTP email notifications.

## Quick Commands
```bash
cd D:\lp
npm run dev       # Dev server with Turbopack (port 3000)
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
```

## Git Status
- Initialized: Yes
- Branch: Hijab
- Remote: origin -> https://github.com/oguenfoude/lp.git (up to date)
- Clean working tree

## Environment Setup
Copy `.env.example` -> `.env.local` and fill:
- `GOOGLE_SERVICE_ACCOUNT` (JSON string) -- Sheets API
- `GOOGLE_SHEET_ID` -- Target spreadsheet
- `SMTP_USER` / `SMTP_PASS` -- Gmail App Password
- `ADMIN_EMAIL` -- Comma-separated recipients
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` -- Meta Pixel ID (optional)

## Key Architecture
- **Order API** (`src/app/api/submit-order/route.ts`): Zod validation -> Google Sheets append -> Email notification
- **Test endpoint** (`src/app/api/test-sheets/route.ts`): Verify Sheets connection
- **Arabic RTL**: Full RTL layout with Cairo font, `dir="rtl"` in layout
- **Algerian localization**: 58 wilayas with delivery fees in `src/lib/data/wilayas.ts`
- **Order state management**: `OrderContext` for global order state
- **Sections**: Hero, Gallery, OrderForm, FAQ, Footer in `src/components/sections/`

## Project Structure
```
lp/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── submit-order/route.ts    # Order submission
│   │   │   └── test-sheets/route.ts     # Sheets connection test
│   │   ├── layout.tsx                   # Root layout (RTL, Arabic fonts)
│   │   ├── page.tsx                     # Landing page
│   │   └── globals.css                  # Global styles + RTL
│   ├── components/
│   │   ├── sections/                    # Page sections
│   │   └── ui/                          # Shadcn UI components
│   ├── lib/
│   │   ├── server/
│   │   │   ├── sheets.ts                # Google Sheets integration
│   │   │   └── email.ts                 # SMTP email service
│   │   ├── context/OrderContext.tsx     # Global order state
│   │   ├── data/
│   │   │   ├── wilayas.ts               # Algeria wilayas + fees
│   │   │   └── site-data.ts             # Static content
│   │   └── utils.ts
│   ├── types/index.ts                   # TypeScript definitions
│   └── proxy.ts                         # Next.js 16 route protection
├── public/images/                       # Static assets
├── .env.local                           # Configured (ignored)
├── .env.example                         # Well-documented template
└── Configuration files
```

## Build Verification
```bash
npm run build  # Completes successfully
npm run dev    # Starts with Turbopack
```

## Notes
- `.env.local` exists and configured (properly ignored)
- `.env.example` is comprehensive (102 lines, well-documented)
- Recent security fix: Next.js updated to 16.0.7 (CVE-2025-66478)
- Build verified working as of 2026-10-08