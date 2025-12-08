/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Order Summary Component
 * Displays order totals and selected items
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { ShoppingBag, Truck, Gift, Tag, Palette, Ruler, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderSummary as OrderSummaryType } from "@/lib/types/hijab";
import { formatPrice } from "@/lib/config/hijab";

interface OrderSummaryProps {
  summary: OrderSummaryType;
  className?: string;
  compact?: boolean;
}

export function OrderSummary({
  summary,
  className,
  compact = false,
}: OrderSummaryProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      {!compact && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white text-center">
          <h3 className="text-lg font-bold flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            ملخص الطلب
          </h3>
        </div>
      )}

      {/* Content */}
      <div className={cn("p-4 space-y-3", compact && "p-3 space-y-2")}>
        {/* Product Info */}
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-sm">{summary.productName}</span>
          <span className="font-medium">×{summary.quantity}</span>
        </div>

        {/* Selected Options */}
        {!compact && (summary.color !== "غير محدد" || summary.size !== "غير محدد") && (
          <div className="flex flex-wrap gap-2">
            {summary.color !== "غير محدد" && (
              <span className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                <Palette className="w-3 h-3" /> {summary.color}
              </span>
            )}
            {summary.size !== "غير محدد" && (
              <span className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                <Ruler className="w-3 h-3" /> {summary.size}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-purple-200 my-2" />

        {/* Subtotal */}
        <div className="flex justify-between items-center text-gray-600">
          <span className="text-sm flex items-center gap-1">
            <Tag className="w-4 h-4" />
            المجموع الفرعي
          </span>
          <span className="font-medium">{formatPrice(summary.subtotal)}</span>
        </div>

        {/* Delivery Fee */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-gray-600">
            <span className="text-sm flex items-center gap-1">
              <Truck className="w-4 h-4" />
              التوصيل
            </span>
            <span className="font-medium">
              {summary.deliveryFee > 0 ? formatPrice(summary.deliveryFee) : "---"}
            </span>
          </div>
          {summary.wilayaName && (
            <div className="text-xs text-gray-500 flex items-center justify-between pr-5">
              <span>الولاية: {summary.wilayaName}</span>
            </div>
          )}
          {summary.deliveryType && (
            <div className="text-xs text-gray-500 flex items-center justify-between pr-5">
              <span>{summary.deliveryType}</span>
            </div>
          )}
        </div>

        {/* Savings */}
        {summary.savings > 0 && (
          <div className="flex justify-between items-center text-green-600 bg-green-50 -mx-4 px-4 py-2">
            <span className="text-sm flex items-center gap-1">
              <Gift className="w-4 h-4" />
              وفّرتي
            </span>
            <span className="font-bold">-{formatPrice(summary.savings)}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t-2 border-purple-300 my-2" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">
            الإجمالي
          </span>
          <span className="text-2xl font-bold text-purple-600">
            {formatPrice(summary.total)}
          </span>
        </div>

        {/* Payment Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-3">
          <p className="text-xs text-yellow-800 text-center flex items-center justify-center gap-1">
            <Wallet className="w-4 h-4" />
            الدفع عند الاستلام - لا حاجة للدفع المسبق
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
