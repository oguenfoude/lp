/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Type Definitions
 * Hijab E-Commerce Landing Page Types
 * ═══════════════════════════════════════════════════════════════
 */

// ════════════════════════════════════════════════════════════════
// PRODUCT TYPES
// ════════════════════════════════════════════════════════════════

export interface HijabColor {
  id: string;
  hex: string;
  nameAr: string;
  nameEn: string;
}

export interface HijabSize {
  id: string;
  label: string;
  range: string;
  nameAr: string;
}

export interface BundleOption {
  id: string;
  quantity: number;
  price: number;
  pricePerUnit: number;
  savings: number;
  savingsPercent: number;
  labelAr: string;
  labelEn: string;
  isPopular?: boolean;
}

export interface HijabProduct {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  basePrice: number;
  originalPrice: number;
  discountPercent: number;
  images: string[];
  colors: HijabColor[];
  sizes: HijabSize[];
  bundles: BundleOption[];
  features: string[];
}

// ════════════════════════════════════════════════════════════════
// LOCATION TYPES
// ════════════════════════════════════════════════════════════════

export interface Wilaya {
  id: number;
  code: string;
  nameAr: string;
  nameEn: string;
  deliveryFee: number;
  deliveryDays: string;
}

export interface DeliveryType {
  id: string;
  labelAr: string;
  labelEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  feeModifier: number; // Extra fee to add to base wilaya fee (e.g., +300 for home)
  requiresAddress: boolean; // Whether this delivery type needs address field
}

// ════════════════════════════════════════════════════════════════
// ORDER STATE TYPES
// ════════════════════════════════════════════════════════════════

export interface OrderState {
  // Customer Info
  fullName: string;
  phone: string;
  wilayaId: number | null;
  commune: string;
  address: string;
  deliveryType: DeliveryType | null;
  
  // Product Selection
  selectedColor: HijabColor | null;
  selectedSize: HijabSize | null;
  selectedBundle: BundleOption | null;
  
  // Calculated
  subtotal: number;
  deliveryFee: number;
  total: number;
  savings: number;
}

export interface OrderSummary {
  productName: string;
  quantity: number;
  color: string;
  size: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  savings: number;
  savingsPercent: number;
  wilayaName: string;
  deliveryType: string; // Delivery type label (e.g., "التوصيل للمنزل")
}

export interface FormErrors {
  fullName?: string;
  phone?: string;
  wilayaId?: string;
  commune?: string;
  address?: string;
  color?: string;
  size?: string;
}

// ════════════════════════════════════════════════════════════════
// FORM SUBMISSION TYPES
// ════════════════════════════════════════════════════════════════

export interface OrderSubmission {
  customerName: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  orderId?: string;
}
