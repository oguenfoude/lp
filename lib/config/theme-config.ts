import type { ThemeConfig } from "@/types";

// ====================
// Theme Configuration
// كل الألوان والخطوط في مكان واحد - سهل التعديل
// ====================

export const themeConfig: ThemeConfig = {
  colors: {
    // Primary: الأزرق - للعناصر الرئيسية والأزرار
    primary: "#2563EB",
    
    // Secondary: الأخضر - للنجاح والثقة
    secondary: "#10B981",
    
    // Accent: البرتقالي/الكهرماني - للعروض وجذب الانتباه
    accent: "#F59E0B",
    
    // Dark: للنصوص الرئيسية
    dark: "#1F2937",
    
    // Light: للخلفيات
    light: "#F9FAFB",
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
