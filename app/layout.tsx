import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config/site-config";

// ====================
// Font Configuration
// استخدام Inter للعربية والإنجليزية
// ====================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ====================
// Metadata Configuration
// معلومات الصفحة الأساسية
// ====================
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "متجرك",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "منتجات طبيعية عالية الجودة",
  keywords: ["منتجات", "طبيعية", "الجزائر", "عناية", "جمال"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: process.env.NEXT_PUBLIC_SITE_NAME || "متجرك",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "منتجات طبيعية عالية الجودة",
    type: "website",
    locale: (process.env.NEXT_PUBLIC_OG_LOCALE || "ar_DZ"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = process.env.NEXT_PUBLIC_LANG || "ar";
  const dir = process.env.NEXT_PUBLIC_DIR || "rtl";
  return (
    <html lang={lang} dir={dir}>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
