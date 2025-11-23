// ====================
// Type Definitions for Landing Page
// ====================

// Hero Section Types
export interface HeroData {
  headline: string;
  subheadline: string;
  image: string;
  ctaText: string;
  trustIndicators: string[];
}

// Feature Item
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Product Information
export interface ProductInfo {
  name: string;
  price: number; // in DZD
  deliveryFee: number;
    // تمت إزالة deliveryTime من التكامل الحالي (يمكن إرجاعه لاحقاً عند الحاجة)
    deliveryTime?: string;
}

// Footer Link
export interface FooterLink {
  text: string;
  href: string;
}

// Footer Data
export interface FooterData {
  copyright: string;
  links: FooterLink[];
  description: string;
  quickLinksTitle?: string;
  contactTitle?: string;
  whatsappLabel?: string;
}

// Complete Site Data Structure
export interface SiteData {
  features: {
    showFeaturesSection: boolean;
  };
  hero: HeroData;
  featuresList: Feature[];
  product: ProductInfo;
  footer: FooterData;
  headerCta?: string;
  featuresSectionTitle?: string;
  featuresSectionSubtitle?: string;
  deliveryTypes: DeliveryType[];
  orderFormTexts: OrderFormTexts;
}

// Site Configuration (from env)
export interface SiteConfig {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

// Theme Configuration
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    light: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
}

// Order Form Data
export interface OrderFormData {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  wilaya: string;
  baldia: string;
  deliveryType: string; // id referencing DeliveryType.id
  quantity: number; // عدد الوحدات، القيمة الافتراضية 1
}

// Form Validation Errors
export interface FormErrors {
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  wilaya?: string;
  baldia?: string;
  deliveryType?: string;
  quantity?: string;
}

// Order Summary
export interface OrderSummary {
  productPrice: number;
  deliveryFee: number;
  total: number;
}

// Delivery Type
export interface DeliveryType {
  id: string; // internal identifier e.g. 'standard'
  label: string; // Arabic label e.g. 'التوصيل العادي'
  fee: number; // fee in DZD
  time: string; // estimated time text
}

// Order Form Texts (all sourced from env, Arabic fallbacks)
export interface OrderFormTexts {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  nameRequiredMsg: string;
  nameInvalidMsg: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneRequiredMsg: string;
  phoneInvalidMsg: string;
  wilayaLabel: string;
  wilayaPlaceholder: string;
  wilayaRequiredMsg: string;
  baldiaLabel: string;
  baldiaPlaceholder: string;
  baldiaRequiredMsg: string;
  addressLabel: string;
  addressPlaceholder: string;
  addressRequiredMsg: string;
  addressInvalidMsg: string;
  deliveryTypeLabel: string;
  quantityLabel?: string;
  quantityPlaceholder?: string;
  quantityRequiredMsg?: string;
  quantityInvalidMsg?: string;
  notesLabel: string;
  notesPlaceholder: string;
  submitText: string;
  processingText: string;
  successMessage: string;
  summaryTitle: string;
  productLabel: string;
  priceLabel: string;
  deliveryLabel: string;
  totalLabel: string;
  estimatedDeliveryPrefix: string;
}
