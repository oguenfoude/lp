/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Product Info Component
 * Product title, description, price, and features
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { Star, Shield, Truck, RefreshCw, Check } from "lucide-react";
import { HIJAB_PRODUCT, formatPrice } from "@/lib/config/hijab";

interface HijabProductInfoProps {
  className?: string;
}

export function HijabProductInfo({ className }: HijabProductInfoProps) {
  return (
    <div className={className}>
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {HIJAB_PRODUCT.titleAr}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">(+500 طلب)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-3xl font-bold text-purple-600">
          {formatPrice(HIJAB_PRODUCT.basePrice)}
        </span>
        <span className="text-lg text-gray-400 line-through">
          {formatPrice(HIJAB_PRODUCT.originalPrice)}
        </span>
        <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded">
          وفّري {HIJAB_PRODUCT.discountPercent}%
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
        {HIJAB_PRODUCT.descriptionAr}
      </p>

      {/* Features List */}
      <div className="space-y-2 mb-6">
        {HIJAB_PRODUCT.features.map((feature, index) => (
          <p key={index} className="text-gray-700 text-sm flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            {feature}
          </p>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-xl">
          <Truck className="w-6 h-6 text-purple-600 mb-1" />
          <span className="text-xs text-gray-600">توصيل سريع</span>
          <span className="text-xs text-gray-400">24-72 ساعة</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-xl">
          <Shield className="w-6 h-6 text-purple-600 mb-1" />
          <span className="text-xs text-gray-600">جودة مضمونة</span>
          <span className="text-xs text-gray-400">100%</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-xl">
          <RefreshCw className="w-6 h-6 text-purple-600 mb-1" />
          <span className="text-xs text-gray-600">تبديل المقاس</span>
          <span className="text-xs text-gray-400">مجاناً</span>
        </div>
      </div>
    </div>
  );
}

export default HijabProductInfo;
