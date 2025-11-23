import type { SiteConfig } from "@/types";

// ====================
// Site Configuration
// كل المعلومات من Environment Variables
// ====================

export const siteConfig: SiteConfig = {
  // اسم الموقع/المتجر (نص عربي محايد كـ fallback)
  name: process.env.NEXT_PUBLIC_SITE_NAME || "متجر افتراضي",
  
  // معلومات الاتصال
  phone: process.env.NEXT_PUBLIC_PHONE || "+213555123456",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+213555123456",
  email: process.env.NEXT_PUBLIC_EMAIL || "contact@example.com",
  
  // روابط السوشيال ميديا
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "",
    twitter: process.env.NEXT_PUBLIC_TWITTER || "",
  },
};

// دالة للتحقق من وجود رابط سوشيال ميديا
export const hasSocialLink = (platform: keyof typeof siteConfig.social): boolean => {
  return !!siteConfig.social[platform] && siteConfig.social[platform] !== "";
};
