import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ====================
// Utility Functions
// ====================

/**
 * دالة دمج الـ classes من Tailwind بشكل ذكي
 * تستخدم في كل المكونات لتجنب تضارب الـ classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * تنسيق السعر بالعملة الجزائرية
 * @param amount - المبلغ بالدينار الجزائري
 * @returns نص منسق مثل "2,990 DZD"
 */
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("en-US")} DZD`;
}

/**
 * التحقق من صحة رقم الهاتف الجزائري
 * يقبل التنسيقات التالية:
 * - +213555123456
 * - 0555123456
 * - 213555123456
 * @param phone - رقم الهاتف
 * @returns true إذا كان الرقم صحيح
 */
export function validatePhone(phone: string): boolean {
  // إزالة كل ما ليس رقماً
  const digitsOnly = phone.replace(/[^0-9]/g, "");
  // التحقق الصارم: 10 أرقام تبدأ بـ 05 أو 06 أو 07
  return /^0(5|6|7)\d{8}$/.test(digitsOnly);
}

/**
 * التحقق من صحة الاسم
 * @param name - الاسم
 * @returns true إذا كان الاسم صحيح (3-50 حرف، حروف ومسافات فقط)
 */
export function validateName(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 3 || trimmed.length > 50) return false;
  
  // يسمح بالحروف الإنجليزية والعربية والمسافات
  const namePattern = /^[a-zA-Z\u0600-\u06FF\s]+$/;
  return namePattern.test(trimmed);
}

/**
 * التحقق من صحة العنوان
 * @param address - العنوان
 * @returns true إذا كان العنوان صحيح (10 أحرف على الأقل)
 */
export function validateAddress(address: string): boolean {
  return address.trim().length >= 10;
}

/**
 * تنسيق رقم الهاتف للعرض
 * @param phone - رقم الهاتف
 * @returns رقم منسق للعرض
 */
export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/[\s-]/g, "");
  
  // إذا كان يبدأ بـ 0، نحوله إلى +213
  if (cleaned.startsWith("0")) {
    return "+213" + cleaned.substring(1);
  }
  
  // إذا كان يبدأ بـ 213، نضيف +
  if (cleaned.startsWith("213")) {
    return "+" + cleaned;
  }
  
  // إذا كان يبدأ بـ +، نرجعه كما هو
  return cleaned.startsWith("+") ? cleaned : "+" + cleaned;
}

/**
 * Smooth scroll إلى عنصر في الصفحة
 * @param elementId - id العنصر
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * حساب الإجمالي (السعر + رسوم التوصيل)
 * @param price - سعر المنتج
 * @param deliveryFee - رسوم التوصيل
 * @returns الإجمالي
 */
export function calculateTotal(price: number, deliveryFee: number, quantity: number = 1): number {
  const q = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
  return price * q + deliveryFee;
}
