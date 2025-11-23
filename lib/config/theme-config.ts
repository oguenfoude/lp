import type { ThemeConfig } from "@/types";

// ====================
// Theme Configuration
// كل الألوان والخطوط في مكان واحد - سهل التعديل
// ====================
// Color palette inspired by warm, earthy tones:
// - Doctor: #f7f7f7 (Very light gray - backgrounds)
// - Jupiter: #e4dfdf (Light gray-beige - secondary backgrounds)
// - Summer's End: #e19371 (Warm coral - accents)
// - Caramel Dream: #ba6544 (Caramel brown - primary)
// - Peanut: #784437 (Rich brown - text)
// - Italian Roast: #2b100f (Very dark brown - headings)
// - Espresso: #502f2a (Dark brown - secondary text)

export const themeConfig: ThemeConfig = {
  colors: {
    // Primary: Caramel Dream - للعناصر الرئيسية والأزرار
    primary: "#ba6544",
    
    // Secondary: Espresso - للعناصر الثانوية والروابط
    secondary: "#502f2a",
    
    // Accent: Summer's End - للعروض وجذب الانتباه
    accent: "#e19371",
    
    // Dark: Italian Roast - للنصوص الرئيسية والعناوين
    dark: "#2b100f",
    
    // Light: Doctor - للخلفيات
    light: "#f7f7f7",
  },
  
  fonts: {
    // Heading: خط العناوين
    heading: "Inter, system-ui, sans-serif",
    
    // Body: خط النصوص العادية
    body: "Inter, system-ui, sans-serif",
  },
  
  // Border Radius: انحناء الزوايا
  borderRadius: "0.5rem",
};

// دالة مساعدة للحصول على الألوان كـ CSS Variables
export const getCSSVariables = () => {
  return {
    "--color-primary": themeConfig.colors.primary,
    "--color-secondary": themeConfig.colors.secondary,
    "--color-accent": themeConfig.colors.accent,
    "--color-dark": themeConfig.colors.dark,
    "--color-light": themeConfig.colors.light,
    "--font-heading": themeConfig.fonts.heading,
    "--font-body": themeConfig.fonts.body,
    "--border-radius": themeConfig.borderRadius,
  };
};
