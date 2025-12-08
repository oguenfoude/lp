import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

// ====================
// Font Configuration
// Cairo - Best Arabic font for e-commerce
// ====================
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// ====================
// Metadata Configuration
// حجاب الأميرة - Landing Page
// ====================
export const metadata: Metadata = {
  title: "حجاب الأميرة الفاخر | أناقة بلا حدود",
  description: "حجاب فاخر بتصميم ملكي من أجود أنواع القماش. توصيل لجميع الولايات الـ58 مع الدفع عند الاستلام.",
  keywords: ["حجاب", "hijab", "أزياء محجبات", "الجزائر", "fashion"],
  openGraph: {
    title: "حجاب الأميرة الفاخر",
    description: "حجاب فاخر بتصميم ملكي من أجود أنواع القماش",
    type: "website",
    locale: "ar_DZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} font-sans antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
