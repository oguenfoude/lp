// Unified configuration (cong) for the landing page MVP
// Arabic / RTL / Black & White theme
// All fallback text lives here instead of environment explosion.

export interface CongTheme {
  colors: {
    bg: string;
    fg: string;
    muted: string;
    border: string;
  };
  fonts: {
    body: string;
    heading: string;
  };
  radii: {
    base: string;
  };
}

export interface CongHero {
  headline: string;
  subheadline: string;
  mainImage: string;
  thumbnails: string[]; // optional extra small images
  ctaText: string;
}

export interface CongGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CongGallery {
  images: CongGalleryImage[];
}

export interface CongProduct {
  name: string;
  price: number; // DZD
  colors: CongColor[];
  sizes: CongSize[];
}

export interface CongColor {
  id: string;
  name: string;
  hex: string;
}

export interface CongSize {
  id: string;
  label: string;
}

export interface CongDeliveryType {
  id: string;
  label: string;
  fee: number; // DZD
  description?: string; // optional short text
}

export interface CongDeliveryConfig {
  types: CongDeliveryType[];
}

export interface CongFormConfig {
  title: string;
  submitButton: string;
  submitButtonLoading: string;
  fields: {
    fullName: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    wilaya: { label: string; placeholder: string };
    commune: { label: string; placeholder: string };
    address: { label: string; placeholder: string };
    deliveryType: { label: string };
    quantity: { label: string };
  };
  validation: {
    fullNameRequired: string;
    phoneInvalid: string;
    wilayaRequired: string;
    communeRequired: string;
    addressRequired: string;
  };
  summary: {
    title: string;
    productLabel: string;
    deliveryLabel: string;
    totalLabel: string;
  };
  success: {
    title: string;
    message: string;
    closeButton: string;
  };
  labels: {
    name: string;
    phone: string;
    wilaya: string;
    baldia: string;
    address: string;
    notes: string;
    quantity: string;
    deliveryType: string;
    submit: string;
  };
  placeholders: {
    name: string;
    phone: string;
    wilaya: string;
    baldia: string;
    address: string;
    notes: string;
    quantity: string;
  };
  messages: {
    success: string;
    nameInvalid: string;
    phoneInvalid: string;
    wilayaRequired: string;
    baldiaRequired: string;
    addressRequired: string;
    addressInvalid: string;
    quantityInvalid: string;
  };
}

export interface CongFAQItem { q: string; a: string; }

export interface CongWhyUsItem {
  icon: string; // emoji or icon identifier
  title: string;
  description: string;
}

export interface CongProductHighlight {
  icon: string; // emoji or icon
  title: string;
  description: string;
}

export interface CongFooterConfig {
  phone: string;
  whatsapp: string;
  email: string;
  instagram?: string;
  facebook?: string;
  copyright: string;
}

export interface CongIntegrationConfig {
  enabled: boolean;
  sheetUrl?: string;
  secretKey?: string;
  sheetName?: string;
}

export interface CongSiteMeta {
  name: string;
  description: string;
  lang: string;
  dir: string;
}

export interface CongRoot {
  site: CongSiteMeta;
  theme: CongTheme;
  hero: CongHero;
  gallery: CongGallery;
  product: CongProduct;
  delivery: CongDeliveryConfig;
  form: CongFormConfig;
  productHighlights: CongProductHighlight[];
  whyUs: CongWhyUsItem[];
  faq: CongFAQItem[];
  footer: CongFooterConfig;
}

// Helper: parse delivery types from env (id:label:fee|id:label:fee)
function parseDeliveryTypes(raw: string | undefined): CongDeliveryType[] {
  if (!raw) {
    return [
      { id: "home", label: "المنزل", fee: 500, description: "توصيل إلى المنزل" },
      { id: "office", label: "المكتب", fee: 500, description: "توصيل إلى المكتب" },
    ];
  }
  return raw.split("|").map(part => {
    const [id, label, feeStr] = part.split(":");
    const fee = parseInt(feeStr || "0", 10);
    return { id: id?.trim() || "", label: (label || id || "").trim(), fee: isNaN(fee) ? 0 : fee };
  }).filter(d => d.id && d.label);
}

const lang = process.env.NEXT_PUBLIC_LANG || "ar";
const dir = process.env.NEXT_PUBLIC_DIR || "rtl";

export const cong: CongRoot = {
  site: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "STRIDE",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "أحذية رجالية فاخرة - تصميم عصري وجودة استثنائية",
    lang,
    dir,
  },
  theme: {
    colors: {
      bg: "#FFFFFF",
      fg: "#1A1A1A",
      muted: "#6B7280",
      border: "#E5E7EB",
    },
    fonts: {
      body: "Inter, system-ui, sans-serif",
      heading: "Inter, system-ui, sans-serif",
    },
    radii: {
      base: "0.75rem",
    },
  },
  hero: {
    headline: process.env.NEXT_PUBLIC_HERO_HEADLINE || "أحذية STRIDE الرجالية الفاخرة",
    subheadline: process.env.NEXT_PUBLIC_HERO_SUBHEADLINE || "تصميم عصري يجمع بين الأناقة والراحة - مثالي للارتداء اليومي والمناسبات الخاصة",
    mainImage: process.env.NEXT_PUBLIC_HERO_IMAGE || "/images/main/hero.avif",
    thumbnails: [],
    ctaText: process.env.NEXT_PUBLIC_HERO_CTA || "اطلب الآن",
  },
  gallery: {
    images: [
      { src: "/images/main/gallery-1.avif", alt: "حذاء رجالي - منظر جانبي" },
      { src: "/images/main/gallery-2.avif", alt: "حذاء رجالي - منظر علوي" },
      { src: "/images/main/gallery-3.avif", alt: "حذاء رجالي - تفاصيل النعل" },
      { src: "/images/main/gallery-4.avif", alt: "حذاء رجالي - منظر خلفي" },
      { src: "/images/main/gallery-5.avif", alt: "حذاء رجالي - تفاصيل القماش" },
      { src: "/images/main/gallery-6.avif", alt: "حذاء رجالي - الاستخدام اليومي" },
    ],
  },
  product: {
    name: process.env.NEXT_PUBLIC_PRODUCT_NAME || "حذاء STRIDE الرجالي الفاخر",
    price: parseInt(process.env.NEXT_PUBLIC_PRODUCT_PRICE || "3500", 10) || 3500,
    colors: [
      { id: "black", name: "أسود كلاسيكي", hex: "#1A1A1A" },
      { id: "white", name: "أبيض ثلجي", hex: "#F8F9FA" },
      { id: "gray", name: "رمادي أنثراسايت", hex: "#52525B" },
    ],
    sizes: [
      { id: "40", label: "40" },
      { id: "41", label: "41" },
      { id: "42", label: "42" },
      { id: "43", label: "43" },
      { id: "44", label: "44" },
    ],
  },
  delivery: {
    types: parseDeliveryTypes(process.env.NEXT_PUBLIC_DELIVERY_TYPES),
  },
  form: {
    title: process.env.NEXT_PUBLIC_FORM_TITLE || "أكمل طلبك",
    submitButton: process.env.NEXT_PUBLIC_FORM_SUBMIT || "تأكيد الطلب",
    submitButtonLoading: process.env.NEXT_PUBLIC_FORM_SUBMIT_LOADING || "جاري الإرسال...",
    fields: {
      fullName: {
        label: "الاسم الكامل *",
        placeholder: "اكتب اسمك الكامل",
      },
      phone: {
        label: "رقم الهاتف *",
        placeholder: "مثال: 0555123456",
      },
      wilaya: {
        label: "الولاية *",
        placeholder: "اختر الولاية",
      },
      commune: {
        label: "البلدية *",
        placeholder: "اكتب البلدية",
      },
      address: {
        label: "العنوان الكامل",
        placeholder: "اكتب العنوان الكامل",
      },
      deliveryType: {
        label: "طريقة التوصيل *",
      },
      quantity: {
        label: "الكمية",
      },
    },
    validation: {
      fullNameRequired: "الاسم الكامل مطلوب",
      phoneInvalid: "رقم هاتف غير صالح (10 أرقام يبدأ بـ 05 أو 06 أو 07)",
      wilayaRequired: "الولاية مطلوبة",
      communeRequired: "البلدية مطلوبة",
      addressRequired: "العنوان مطلوب",
    },
    summary: {
      title: "ملخص الطلب",
      productLabel: "المنتج",
      deliveryLabel: "التوصيل",
      totalLabel: "المجموع الكلي",
    },
    success: {
      title: "✓ تم استلام طلبك!",
      message: "سنتواصل معك قريباً لتأكيد الطلب والتسليم.",
      closeButton: "حسناً",
    },
    labels: {
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      wilaya: "الولاية",
      baldia: "البلدية",
      address: "العنوان",
      notes: "ملاحظات",
      quantity: "الكمية",
      deliveryType: "طريقة التوصيل",
      submit: "تأكيد الطلب",
    },
    placeholders: {
      name: "اكتب اسمك",
      phone: "مثال: 0555123456",
      wilaya: "اختر الولاية",
      baldia: "اكتب البلدية",
      address: "اكتب العنوان الكامل",
      notes: "أي تعليمات؟",
      quantity: "1",
    },
    messages: {
      success: "✓ تم استلام طلبك! سنراجع ونكلمك قريباً.",
      nameInvalid: "اسم غير صالح",
      phoneInvalid: "رقم هاتف غير صالح (10 أرقام يبدأ بـ 05 أو 06 أو 07)",
      wilayaRequired: "الولاية مطلوبة",
      baldiaRequired: "البلدية مطلوبة",
      addressRequired: "العنوان مطلوب",
      addressInvalid: "العنوان قصير جداً (10 أحرف على الأقل)",
      quantityInvalid: "كمية غير صالحة",
    },
  },
  productHighlights: [
    { icon: "shield", title: "جودة استثنائية ومتانة", description: "مصنوع من أفضل الخامات المستوردة التي تضمن عمراً طويلاً واستخداماً مريحاً" },
    { icon: "sparkles", title: "تصميم عصري وأنيق", description: "موديل حصري يجمع بين الكلاسيكية والعصرية، مناسب لجميع الإطلالات" },
    { icon: "wind", title: "تهوية مثالية ومريحة", description: "نسيج خاص يسمح بمرور الهواء ويمنع التعرق، راحة طوال اليوم" },
    { icon: "zap", title: "نعل مضاد للانزلاق", description: "تقنية متطورة للنعل توفر ثباتاً وأماناً على جميع الأسطح" },
    { icon: "target", title: "خفيف ومرن للغاية", description: "وزن خفيف ومرونة عالية تمنحك حرية الحركة والراحة الفائقة" },
    { icon: "star", title: "متعدد الاستخدامات", description: "مثالي للعمل، النزهات، الرياضة الخفيفة، أو الخروج مع الأصدقاء" },
  ],
  whyUs: [
    { icon: "truck", title: "توصيل سريع وآمن", description: "نوصل طلبك خلال 48-72 ساعة إلى باب منزلك" },
    { icon: "credit-card", title: "الدفع عند الاستلام", description: "ادفع فقط عندما يصلك المنتج وتتأكد منه" },
    { icon: "badge-check", title: "منتج أصلي 100%", description: "ضمان الجودة والأصالة على جميع منتجاتنا" },
    { icon: "headphones", title: "دعم عملاء متميز", description: "فريقنا جاهز للرد على جميع استفساراتك" },
    { icon: "refresh-cw", title: "إرجاع واستبدال مجاني", description: "يمكنك الإرجاع خلال 7 أيام إذا لم يعجبك المنتج" },
  ],
  faq: [
    { q: "كيف أختار المقاس المناسب لي؟", a: "يمكنك قياس قدمك بالسنتيمتر ومقارنتها بجدول المقاسات. إذا كان قدمك بين مقاسين، نوصي باختيار المقاس الأكبر للحصول على أقصى راحة. فريق الدعم متاح لمساعدتك في اختيار المقاس المناسب." },
    { q: "ما هي مدة التوصيل وتكلفته؟", a: "التوصيل يستغرق من 48 إلى 72 ساعة عمل حسب موقعك. تكلفة التوصيل 500 دج لجميع أنحاء الجزائر. سنتواصل معك هاتفياً لتأكيد موعد التسليم المناسب لك." },
    { q: "هل يمكنني الدفع نقداً عند الاستلام؟", a: "نعم بالتأكيد! نوفر خدمة الدفع عند الاستلام لجميع الطلبات. يمكنك فحص المنتج والتأكد من جودته قبل الدفع للمندوب." },
    { q: "ماذا لو لم يناسبني المنتج؟ هل يمكن الإرجاع؟", a: "نعم، يمكنك إرجاع أو استبدال المنتج خلال 7 أيام من تاريخ الاستلام. المنتج يجب أن يكون بحالته الأصلية وغير مستعمل. نحن نضمن رضاك الكامل." },
  ],
  footer: {
    phone: process.env.NEXT_PUBLIC_PHONE || "0555123456",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "0555123456",
    email: process.env.NEXT_PUBLIC_EMAIL || "contact@example.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "",
    copyright: process.env.NEXT_PUBLIC_FOOTER_COPYRIGHT || "© 2025 جميع الحقوق محفوظة",
  },
};

export const congCssVariables = () => ({
  "--color-bg": cong.theme.colors.bg,
  "--color-fg": cong.theme.colors.fg,
  "--color-muted": cong.theme.colors.muted,
  "--color-border": cong.theme.colors.border,
  "--font-body": cong.theme.fonts.body,
  "--font-heading": cong.theme.fonts.heading,
  "--radius-base": cong.theme.radii.base,
});

// Social media icon config (minimal) appended at end of cong
export interface CongSocialLink {
  id: string; // slug e.g. facebook, instagram
  label: string; // accessible label
  url: string; // full href
  svg: {
    viewBox: string;
    path: string; // single path for simplicity
    fill: string; // color or gradient id reference
    gradient?: { id: string; stops: { offset: string; color: string }[] };
  };
}

// Build socials based on existing footer URLs
export const congSocials: CongSocialLink[] = (() => {
  const list: CongSocialLink[] = [];
  if (cong.footer.instagram) {
    list.push({
      id: "instagram",
      label: "Instagram",
      url: cong.footer.instagram,
      svg: {
        viewBox: "0 0 24 24",
        path: "M12 2.2c3.18 0 3.56.01 4.81.07 3.03.14 4.45 1.57 4.59 4.59.06 1.25.07 1.63.07 4.81s-.01 3.56-.07 4.81c-.14 3.02-1.56 4.45-4.59 4.59-1.25.06-1.63.07-4.81.07s-3.56-.01-4.81-.07c-3.02-.14-4.45-1.57-4.59-4.59C2.21 15.65 2.2 15.27 2.2 12s.01-3.56.07-4.81c.14-3.02 1.57-4.45 4.59-4.59C8.44 2.21 8.82 2.2 12 2.2Zm0 2.05c-3.1 0-3.47.01-4.69.07-2.19.1-3.21 1.15-3.31 3.31-.06 1.22-.07 1.59-.07 4.69s.01 3.47.07 4.69c.1 2.16 1.13 3.21 3.31 3.31 1.22.06 1.59.07 4.69.07s3.47-.01 4.69-.07c2.16-.1 3.21-1.15 3.31-3.31.06-1.22.07-1.59.07-4.69s-.01-3.47-.07-4.69c-.1-2.16-1.15-3.21-3.31-3.31-1.22-.06-1.59-.07-4.69-.07Zm0 3.87a3.88 3.88 0 1 1 0 7.75 3.88 3.88 0 0 1 0-7.75Zm0 6.35a2.47 2.47 0 1 0 0-4.94 2.47 2.47 0 0 0 0 4.94Zm4.95-7.92a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z",
        fill: "url(#igGradient)",
        gradient: {
          id: "igGradient",
            stops: [
              { offset: "0%", color: "#FEDA75" },
              { offset: "25%", color: "#FA7E1E" },
              { offset: "50%", color: "#D62976" },
              { offset: "75%", color: "#962FBF" },
              { offset: "100%", color: "#4F5BD5" },
            ]
        }
      }
    });
  }
  if (cong.footer.facebook) {
    list.push({
      id: "facebook",
      label: "Facebook",
      url: cong.footer.facebook,
      svg: {
        viewBox: "0 0 24 24",
        path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.86v-8.4H7.08v-3.47h3.05V9.43c0-3 1.79-4.66 4.53-4.66 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.88v2.25h3.33l-.53 3.47h-2.8v8.4C19.61 23.08 24 18.09 24 12.07Z",
        fill: "#1877F2"
      }
    });
  }
  return list;
})();
