    import type { SiteData, DeliveryType, OrderFormTexts } from "@/types";

// ====================
// Site Content Data
// كل المحتوى من Environment Variables - لا توجد نصوص ثابتة
// ====================

// Helper function لتحويل النص إلى array عبر separator
const parseArray = (envValue: string | undefined, separator: string = "|"): string[] => {
  if (!envValue) return [];
  return envValue.split(separator).map(item => item.trim()).filter(Boolean);
};

// Helper function لتحويل النص إلى رقم
const parseNumber = (envValue: string | undefined, defaultValue: number = 0): number => {
  if (!envValue) return defaultValue;
  const parsed = parseFloat(envValue);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Helper function للحصول على قيمة boolean
const parseBoolean = (envValue: string | undefined, defaultValue: boolean = false): boolean => {
  if (!envValue) return defaultValue;
  return envValue.toLowerCase() === "true" || envValue === "1";
};

// Parse delivery types from composite env var: id:label:fee:time | id:label:fee:time
const parseDeliveryTypes = (envValue: string | undefined): DeliveryType[] => {
  if (!envValue) {
    return [
      {
        id: "standard",
        label: process.env.NEXT_PUBLIC_DELIVERY_STANDARD_LABEL || "التوصيل العادي",
        fee: parseNumber(process.env.NEXT_PUBLIC_DELIVERY_FEE_STANDARD, 500),
        time: process.env.NEXT_PUBLIC_DELIVERY_TIME_STANDARD || "48-72 ساعة",
      },
      {
        id: "express",
        label: process.env.NEXT_PUBLIC_DELIVERY_EXPRESS_LABEL || "التوصيل السريع",
        fee: parseNumber(process.env.NEXT_PUBLIC_DELIVERY_FEE_EXPRESS, 800),
        time: process.env.NEXT_PUBLIC_DELIVERY_TIME_EXPRESS || "24-48 ساعة",
      },
    ];
  }
  return envValue
    .split("|")
    .map((item) => {
      const [id, label, feeStr, time] = item.split(":");
      return {
        id: (id || "").trim(),
        label: (label || id || "").trim(),
        fee: parseNumber(feeStr, 0),
        time: (time || "").trim(),
      } as DeliveryType;
    })
    .filter((d) => d.id && d.label);
};

// Order form texts composed from env with Arabic fallbacks
const orderFormTexts: OrderFormTexts = {
  title: process.env.NEXT_PUBLIC_ORDER_FORM_TITLE || "أكمل طلبك",
  subtitle: process.env.NEXT_PUBLIC_ORDER_FORM_SUBTITLE || "املأ بياناتك وسنتواصل معك قريباً",
  nameLabel: process.env.NEXT_PUBLIC_ORDER_NAME_LABEL || "الاسم الكامل *",
  namePlaceholder: process.env.NEXT_PUBLIC_ORDER_NAME_PLACEHOLDER || "اكتب اسمك الكامل",
  nameRequiredMsg: process.env.NEXT_PUBLIC_ORDER_NAME_REQUIRED || "الاسم مطلوب",
  nameInvalidMsg: process.env.NEXT_PUBLIC_ORDER_NAME_INVALID || "الرجاء إدخال اسم صحيح (3-50 حرفاً)",
  phoneLabel: process.env.NEXT_PUBLIC_ORDER_PHONE_LABEL || "رقم الهاتف *",
  phonePlaceholder: process.env.NEXT_PUBLIC_ORDER_PHONE_PLACEHOLDER || "مثال: 0555123456",
  phoneRequiredMsg: process.env.NEXT_PUBLIC_ORDER_PHONE_REQUIRED || "رقم الهاتف مطلوب",
  phoneInvalidMsg: process.env.NEXT_PUBLIC_ORDER_PHONE_INVALID || "الرجاء إدخال رقم هاتف جزائري صحيح (10 أرقام يبدأ بـ 05 أو 06 أو 07)",
  wilayaLabel: process.env.NEXT_PUBLIC_ORDER_WILAYA_LABEL || "الولاية *",
  wilayaPlaceholder: process.env.NEXT_PUBLIC_ORDER_WILAYA_PLACEHOLDER || "اختر ولايتك",
  wilayaRequiredMsg: process.env.NEXT_PUBLIC_ORDER_WILAYA_REQUIRED || "الولاية مطلوبة",
  baldiaLabel: process.env.NEXT_PUBLIC_ORDER_BALDIA_LABEL || "البلدية *",
  baldiaPlaceholder: process.env.NEXT_PUBLIC_ORDER_BALDIA_PLACEHOLDER || "اكتب البلدية",
  baldiaRequiredMsg: process.env.NEXT_PUBLIC_ORDER_BALDIA_REQUIRED || "البلدية مطلوبة",
  addressLabel: process.env.NEXT_PUBLIC_ORDER_ADDRESS_LABEL || "العنوان الكامل *",
  addressPlaceholder: process.env.NEXT_PUBLIC_ORDER_ADDRESS_PLACEHOLDER || "اكتب عنوان التوصيل",
  addressRequiredMsg: process.env.NEXT_PUBLIC_ORDER_ADDRESS_REQUIRED || "العنوان مطلوب",
  addressInvalidMsg: process.env.NEXT_PUBLIC_ORDER_ADDRESS_INVALID || "يجب أن يكون العنوان 10 أحرف على الأقل",
  deliveryTypeLabel: process.env.NEXT_PUBLIC_ORDER_DELIVERY_TYPE_LABEL || "طريقة التوصيل *",
  notesLabel: process.env.NEXT_PUBLIC_ORDER_NOTES_LABEL || "ملاحظات (اختياري)",
  notesPlaceholder: process.env.NEXT_PUBLIC_ORDER_NOTES_PLACEHOLDER || "أي تعليمات خاصة؟",
  submitText: process.env.NEXT_PUBLIC_ORDER_SUBMIT_TEXT || "تأكيد الطلب",
  processingText: process.env.NEXT_PUBLIC_ORDER_PROCESSING_TEXT || "جاري المعالجة...",
  successMessage: process.env.NEXT_PUBLIC_ORDER_SUCCESS_MESSAGE || "✓ تم استلام طلبك! سنتواصل معك قريباً.",
  summaryTitle: process.env.NEXT_PUBLIC_ORDER_SUMMARY_TITLE || "ملخص الطلب",
  productLabel: process.env.NEXT_PUBLIC_ORDER_SUMMARY_PRODUCT_LABEL || "المنتج",
  priceLabel: process.env.NEXT_PUBLIC_ORDER_SUMMARY_PRICE_LABEL || "السعر:",
  deliveryLabel: process.env.NEXT_PUBLIC_ORDER_SUMMARY_DELIVERY_LABEL || "التوصيل:",
  totalLabel: process.env.NEXT_PUBLIC_ORDER_SUMMARY_TOTAL_LABEL || "الإجمالي:",
  estimatedDeliveryPrefix: process.env.NEXT_PUBLIC_ORDER_ESTIMATED_PREFIX || "⏰ التوصيل المتوقع:",
  quantityLabel: process.env.NEXT_PUBLIC_ORDER_QUANTITY_LABEL || "الكمية",
  quantityPlaceholder: process.env.NEXT_PUBLIC_ORDER_QUANTITY_PLACEHOLDER || "1",
  quantityRequiredMsg: process.env.NEXT_PUBLIC_ORDER_QUANTITY_REQUIRED || "الكمية مطلوبة",
  quantityInvalidMsg: process.env.NEXT_PUBLIC_ORDER_QUANTITY_INVALID || "الكمية يجب أن تكون رقماً صحيحاً أكبر من 0",
};

export const siteData: SiteData = {
  // ====================
  // Feature Flags
  // ====================
  features: {
    showFeaturesSection: parseBoolean(process.env.NEXT_PUBLIC_SHOW_FEATURES, false),
  },

  // ====================
  // Hero Section
  // ====================
  hero: {
    // نصوص محايدة بدون ادعاءات تسويقية
    headline: process.env.NEXT_PUBLIC_HERO_HEADLINE || "عنوان رئيسي افتراضي",
    subheadline: process.env.NEXT_PUBLIC_HERO_SUBHEADLINE || "وصف فرعي مختصر قابل للتعديل من المتغيرات البيئية",
    // صورة البطل - fallback خارجي محايد قابل للتخصيص
    image: process.env.NEXT_PUBLIC_HERO_IMAGE || "https://placehold.co/800x600?text=Hero+Image&font=source-sans-pro",
    ctaText: process.env.NEXT_PUBLIC_HERO_CTA || "إجراء افتراضي",
    trustIndicators: parseArray(process.env.NEXT_PUBLIC_TRUST_ITEMS, "|"),
  },

  // ====================
  // Features Section
  // ====================
  // نصوص محايدة لقسم المميزات
  featuresSectionTitle: process.env.NEXT_PUBLIC_FEATURES_TITLE || "",
  featuresSectionSubtitle: process.env.NEXT_PUBLIC_FEATURES_SUBTITLE || "",
  featuresList: parseArray(process.env.NEXT_PUBLIC_FEATURES_LIST, "||").map(item => {
    // توقع صيغة عنصر الميزة: icon::title::description
    const [icon, title, description] = item.split("::");
    return { icon, title, description };
  }),

  // ====================
  // Product Information
  // ====================
  product: {
    name: process.env.NEXT_PUBLIC_PRODUCT_NAME || "كريم طبيعي للوجه",
    price: parseNumber(process.env.NEXT_PUBLIC_PRODUCT_PRICE, 2990),
    deliveryFee: parseNumber(process.env.NEXT_PUBLIC_DELIVERY_FEE, 500),
    // تمت إزالة استخدام deliveryTime من التكامل؛ يبقى اختيارياً للاستخدام الداخلي فقط
    deliveryTime: process.env.NEXT_PUBLIC_DELIVERY_TIME || "",
  },

  // Delivery Types fallback: المنزل / المكتب فقط بدون زيادات لغوية
  deliveryTypes: (() => {
    const list = parseDeliveryTypes(process.env.NEXT_PUBLIC_DELIVERY_TYPES);
    if (list.length === 0) {
      return [
        { id: "home", label: "المنزل", fee: 500, time: "24-48 ساعة" },
        { id: "office", label: "المكتب", fee: 300, time: "24-48 ساعة" },
      ];
    }
    // تطبيع أي تسميات طويلة إلى الشكل المختصر المطلوب إذا طابقت نمطاً معروفاً
    return list.map(d => {
      const normalizedLabel = d.label.replace(/^التوصيل\s*(?:إلى)?\s*/, ""); // يحذف "التوصيل" و"إلى"
      if (["المنزل", "المكتب"].includes(normalizedLabel)) {
        return { ...d, label: normalizedLabel };
      }
      return d;
    });
  })(),

  // Order Form Texts
  orderFormTexts: orderFormTexts,

  // Header CTA (can differ from hero CTA)
  headerCta: process.env.NEXT_PUBLIC_HEADER_CTA || "اطلب الآن",

  // ====================
  // Footer Data
  // ====================
  footer: {
    copyright: process.env.NEXT_PUBLIC_FOOTER_COPYRIGHT || "2025 متجرك. جميع الحقوق محفوظة.",
    description: process.env.NEXT_PUBLIC_FOOTER_DESCRIPTION || "",
    quickLinksTitle: process.env.NEXT_PUBLIC_FOOTER_QUICK_LINKS_TITLE || "",
    contactTitle: process.env.NEXT_PUBLIC_FOOTER_CONTACT_TITLE || "تواصل معنا",
    whatsappLabel: process.env.NEXT_PUBLIC_FOOTER_WHATSAPP_LABEL || "واتساب",
    links: [] as { text: string; href: string }[],
  },
};
