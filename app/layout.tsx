import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cong, congCssVariables } from "@/lib/config/cong";
import { OrderProvider } from "@/lib/context/OrderContext";

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
  title: cong.site.name,
  description: cong.site.description,
  openGraph: {
    title: cong.site.name,
    description: cong.site.description,
    type: "website",
    locale: "ar_DZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang, dir } = cong.site;
  const cssVars = congCssVariables();
  return (
    <html lang={lang} dir={dir}>
      <body
        className={`${inter.variable} antialiased bg-[var(--color-bg)] text-[var(--color-fg)]`}
        style={cssVars as React.CSSProperties}
      >
        <OrderProvider>
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
