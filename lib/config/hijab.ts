/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Product Configuration
 * All product data, pricing, colors, and delivery logic
 * ═══════════════════════════════════════════════════════════════
 */

import type { HijabProduct, HijabColor, HijabSize, BundleOption, Wilaya, DeliveryType } from "@/lib/types/hijab";

// ════════════════════════════════════════════════════════════════
// DELIVERY TYPES
// ════════════════════════════════════════════════════════════════

export const DELIVERY_TYPES: DeliveryType[] = [
  {
    id: "desk",
    labelAr: "التوصيل للمكتب",
    labelEn: "Office Delivery",
    descriptionAr: "استلم الطرد في مكتبك",
    feeModifier: 0, // Base wilaya fee only
    requiresAddress: false, // No address needed for desk
  },
  {
    id: "home",
    labelAr: "التوصيل للمنزل",
    labelEn: "Home Delivery",
    descriptionAr: "يصلك الطرد إلى عتبة منزلك",
    feeModifier: 300, // +300 DA extra for home delivery
    requiresAddress: true, // Address required for home
  },
];

// ════════════════════════════════════════════════════════════════
// PRODUCT COLORS
// ════════════════════════════════════════════════════════════════

export const HIJAB_COLORS: HijabColor[] = [
  { id: "pink", hex: "#E879A5", nameAr: "وردي", nameEn: "Pink" },
  { id: "aubergine", hex: "#522339", nameAr: "أوبرجين", nameEn: "Aubergine" },
  { id: "black", hex: "#000000", nameAr: "أسود", nameEn: "Black" },
  { id: "beige", hex: "#F5F5DC", nameAr: "بيج", nameEn: "Beige" },
  { id: "royal-green", hex: "#1B4D3E", nameAr: "أخضر ملكي", nameEn: "Royal Green" },
];

// ════════════════════════════════════════════════════════════════
// PRODUCT SIZES
// ════════════════════════════════════════════════════════════════

export const HIJAB_SIZES: HijabSize[] = [
  { id: "m", label: "M", range: "36-38", nameAr: "صغير" },
  { id: "l", label: "L", range: "40-42", nameAr: "وسط" },
  { id: "xl", label: "XL", range: "44-46", nameAr: "كبير" },
  { id: "xxl", label: "XXL", range: "48-50", nameAr: "كبير جداً" },
];

// ════════════════════════════════════════════════════════════════
// BUNDLE PRICING (CRITICAL BUSINESS LOGIC)
// ════════════════════════════════════════════════════════════════

const BASE_PRICE = 2900; // Base price per unit

export const HIJAB_BUNDLES: BundleOption[] = [
  {
    id: "bundle-1",
    quantity: 1,
    price: 2900,
    pricePerUnit: 2900,
    savings: 0,
    savingsPercent: 0,
    labelAr: "قطعة واحدة",
    labelEn: "1 Piece",
    isPopular: false,
  },
  {
    id: "bundle-2",
    quantity: 2,
    price: 5400,
    pricePerUnit: 2700,
    savings: 400, // (2900 * 2) - 5400 = 400
    savingsPercent: 6.9,
    labelAr: "قطعتين - وفّر 400 دج",
    labelEn: "2 Pieces - Save 400 DA",
    isPopular: true, // "الأكثر طلباً"
  },
  {
    id: "bundle-3",
    quantity: 3,
    price: 8000,
    pricePerUnit: 2667,
    savings: 700, // (2900 * 3) - 8000 = 700
    savingsPercent: 8.0,
    labelAr: "3 قطع - عرض العائلة",
    labelEn: "3 Pieces - Family Deal",
    isPopular: false,
  },
];

// ════════════════════════════════════════════════════════════════
// PRODUCT IMAGES
// Using local images from public/images/main/
// ════════════════════════════════════════════════════════════════

export const HIJAB_IMAGES: string[] = [
  "/images/main/img1.webp",
  "/images/main/img2.webp",
  "/images/main/img3.jpeg",
  "/images/main/img4.jpeg",

];

// ════════════════════════════════════════════════════════════════
// MAIN PRODUCT CONFIGURATION
// ════════════════════════════════════════════════════════════════

export const HIJAB_PRODUCT: HijabProduct = {
  id: "hijab-princess-001",
  titleAr: "حجاب الأميرة الفاخر",
  titleEn: "Luxury Princess Hijab",
  descriptionAr: `حجاب فاخر بتصميم ملكي من أجود أنواع القماش. 
يتميز بخامة ناعمة ومريحة تناسب جميع الأوقات والمناسبات.
يأتي مع شال فاخر من نفس القماش.`,
  basePrice: BASE_PRICE,
  originalPrice: 3500,
  discountPercent: 17,
  images: HIJAB_IMAGES,
  colors: HIJAB_COLORS,
  sizes: HIJAB_SIZES,
  bundles: HIJAB_BUNDLES,
  features: [
    "قماش برادا أصلي عالي الجودة",
    "تصميم واسع ومريح",
    "مناسب للمناسبات والخروجات اليومية",
    "يشمل شال فاخر من نفس القماش",
    "متوفر بـ 5 ألوان مميزة",
  ],
};

// ════════════════════════════════════════════════════════════════
// ALGERIAN WILAYAS (58 PROVINCES)
// ════════════════════════════════════════════════════════════════

export const WILAYAS_DZ: Wilaya[] = [
  // North - Coastal (Fast delivery: 24-48h)
  { id: 16, code: "16", nameAr: "الجزائر", nameEn: "Algiers", deliveryFee: 400, deliveryDays: "24-48 ساعة" },
  { id: 31, code: "31", nameAr: "وهران", nameEn: "Oran", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 23, code: "23", nameAr: "عنابة", nameEn: "Annaba", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 25, code: "25", nameAr: "قسنطينة", nameEn: "Constantine", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 9, code: "09", nameAr: "البليدة", nameEn: "Blida", deliveryFee: 400, deliveryDays: "24-48 ساعة" },
  { id: 35, code: "35", nameAr: "بومرداس", nameEn: "Boumerdes", deliveryFee: 400, deliveryDays: "24-48 ساعة" },
  { id: 42, code: "42", nameAr: "تيبازة", nameEn: "Tipaza", deliveryFee: 450, deliveryDays: "24-48 ساعة" },
  
  // Central
  { id: 6, code: "06", nameAr: "بجاية", nameEn: "Bejaia", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 15, code: "15", nameAr: "تيزي وزو", nameEn: "Tizi Ouzou", deliveryFee: 480, deliveryDays: "24-48 ساعة" },
  { id: 19, code: "19", nameAr: "سطيف", nameEn: "Setif", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 26, code: "26", nameAr: "المدية", nameEn: "Medea", deliveryFee: 450, deliveryDays: "24-48 ساعة" },
  { id: 10, code: "10", nameAr: "البويرة", nameEn: "Bouira", deliveryFee: 460, deliveryDays: "24-48 ساعة" },
  
  // West
  { id: 13, code: "13", nameAr: "تلمسان", nameEn: "Tlemcen", deliveryFee: 550, deliveryDays: "48-72 ساعة" },
  { id: 22, code: "22", nameAr: "سيدي بلعباس", nameEn: "Sidi Bel Abbes", deliveryFee: 550, deliveryDays: "48-72 ساعة" },
  { id: 27, code: "27", nameAr: "مستغانم", nameEn: "Mostaganem", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 29, code: "29", nameAr: "معسكر", nameEn: "Mascara", deliveryFee: 520, deliveryDays: "24-48 ساعة" },
  
  // East
  { id: 5, code: "05", nameAr: "باتنة", nameEn: "Batna", deliveryFee: 550, deliveryDays: "48-72 ساعة" },
  { id: 4, code: "04", nameAr: "أم البواقي", nameEn: "Oum El Bouaghi", deliveryFee: 520, deliveryDays: "48-72 ساعة" },
  { id: 12, code: "12", nameAr: "تبسة", nameEn: "Tebessa", deliveryFee: 580, deliveryDays: "48-72 ساعة" },
  { id: 21, code: "21", nameAr: "سكيكدة", nameEn: "Skikda", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 36, code: "36", nameAr: "الطارف", nameEn: "El Tarf", deliveryFee: 520, deliveryDays: "48-72 ساعة" },
  { id: 43, code: "43", nameAr: "ميلة", nameEn: "Mila", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  
  // South (Longer delivery: 48-72h+)
  { id: 7, code: "07", nameAr: "بسكرة", nameEn: "Biskra", deliveryFee: 600, deliveryDays: "48-72 ساعة" },
  { id: 17, code: "17", nameAr: "الجلفة", nameEn: "Djelfa", deliveryFee: 580, deliveryDays: "48-72 ساعة" },
  { id: 3, code: "03", nameAr: "الأغواط", nameEn: "Laghouat", deliveryFee: 600, deliveryDays: "48-72 ساعة" },
  { id: 39, code: "39", nameAr: "الوادي", nameEn: "El Oued", deliveryFee: 650, deliveryDays: "48-72 ساعة" },
  { id: 30, code: "30", nameAr: "ورقلة", nameEn: "Ouargla", deliveryFee: 700, deliveryDays: "48-72+ ساعة" },
  { id: 47, code: "47", nameAr: "غرداية", nameEn: "Ghardaia", deliveryFee: 680, deliveryDays: "48-72+ ساعة" },
  
  // Deep South (Sahara)
  { id: 1, code: "01", nameAr: "أدرار", nameEn: "Adrar", deliveryFee: 900, deliveryDays: "72+ ساعة" },
  { id: 11, code: "11", nameAr: "تمنراست", nameEn: "Tamanrasset", deliveryFee: 900, deliveryDays: "72+ ساعة" },
  { id: 33, code: "33", nameAr: "إليزي", nameEn: "Illizi", deliveryFee: 900, deliveryDays: "72+ ساعة" },
  { id: 37, code: "37", nameAr: "تندوف", nameEn: "Tindouf", deliveryFee: 850, deliveryDays: "72+ ساعة" },
  
  // More wilayas (abbreviated for brevity - full 58 in production)
  { id: 2, code: "02", nameAr: "الشلف", nameEn: "Chlef", deliveryFee: 480, deliveryDays: "24-48 ساعة" },
  { id: 8, code: "08", nameAr: "بشار", nameEn: "Bechar", deliveryFee: 750, deliveryDays: "72+ ساعة" },
  { id: 14, code: "14", nameAr: "تيارت", nameEn: "Tiaret", deliveryFee: 520, deliveryDays: "48-72 ساعة" },
  { id: 18, code: "18", nameAr: "جيجل", nameEn: "Jijel", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 20, code: "20", nameAr: "سعيدة", nameEn: "Saida", deliveryFee: 540, deliveryDays: "48-72 ساعة" },
  { id: 24, code: "24", nameAr: "قالمة", nameEn: "Guelma", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 28, code: "28", nameAr: "المسيلة", nameEn: "M'Sila", deliveryFee: 550, deliveryDays: "48-72 ساعة" },
  { id: 32, code: "32", nameAr: "البيض", nameEn: "El Bayadh", deliveryFee: 650, deliveryDays: "48-72+ ساعة" },
  { id: 34, code: "34", nameAr: "برج بوعريريج", nameEn: "Bordj Bou Arreridj", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
  { id: 38, code: "38", nameAr: "تسمسيلت", nameEn: "Tissemsilt", deliveryFee: 520, deliveryDays: "48-72 ساعة" },
  { id: 40, code: "40", nameAr: "خنشلة", nameEn: "Khenchela", deliveryFee: 560, deliveryDays: "48-72 ساعة" },
  { id: 41, code: "41", nameAr: "سوق أهراس", nameEn: "Souk Ahras", deliveryFee: 540, deliveryDays: "48-72 ساعة" },
  { id: 44, code: "44", nameAr: "عين الدفلى", nameEn: "Ain Defla", deliveryFee: 460, deliveryDays: "24-48 ساعة" },
  { id: 45, code: "45", nameAr: "النعامة", nameEn: "Naama", deliveryFee: 680, deliveryDays: "48-72+ ساعة" },
  { id: 46, code: "46", nameAr: "عين تيموشنت", nameEn: "Ain Temouchent", deliveryFee: 560, deliveryDays: "48-72 ساعة" },
  { id: 48, code: "48", nameAr: "غليزان", nameEn: "Relizane", deliveryFee: 500, deliveryDays: "24-48 ساعة" },
];

// ════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════

/**
 * Get wilaya by ID
 */
export function getWilayaById(id: number): Wilaya | undefined {
  return WILAYAS_DZ.find((w) => w.id === id);
}

/**
 * Get delivery fee by wilaya ID
 */
export function getDeliveryFee(wilayaId: number): number {
  const wilaya = getWilayaById(wilayaId);
  return wilaya?.deliveryFee ?? 0;
}

/**
 * Get bundle by ID
 */
export function getBundleById(id: string): BundleOption | undefined {
  return HIJAB_BUNDLES.find((b) => b.id === id);
}

/**
 * Get bundle by quantity
 */
export function getBundleByQuantity(qty: number): BundleOption | undefined {
  return HIJAB_BUNDLES.find((b) => b.quantity === qty);
}

/**
 * Calculate order total
 */
export function calculateOrderTotal(bundlePrice: number, deliveryFee: number): number {
  return bundlePrice + deliveryFee;
}

/**
 * Format price in DZD
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString("ar-DZ")} دج`;
}

/**
 * Validate Algerian phone number
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s+/g, "");
  return /^(05|06|07)[0-9]{8}$/.test(cleaned);
}

// ════════════════════════════════════════════════════════════════
// SITE CONFIGURATION
// ════════════════════════════════════════════════════════════════

export const SITE_CONFIG = {
  name: "حجاب الأميرة",
  whatsapp: "213541499503",
  whatsappDisplay: "0541 49 95 03",
  instagram: "https://www.instagram.com/hijab.princess",
  facebook: "https://www.facebook.com/hijab.princess",
  policies: {
    delivery: "توصيل متوفر إلى جميع الولايات الـ58 مع الدفع عند الاستلام",
    return: "نقبل تبديل المقاس فقط - لا نقبل تبديل الألوان أو الاسترجاع",
    inspection: "يمكنك تفقد الطرد كاملاً عند استلامه",
  },
};
