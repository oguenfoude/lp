/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Mobile Sticky Bar
 * Fixed bottom bar for mobile with price and CTA
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { ShoppingBag, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/config/hijab";
import type { OrderSummary } from "@/lib/types/hijab";

interface MobileStickyBarProps {
  summary: OrderSummary;
  onOrderClick: () => void;
  isVisible?: boolean;
}

export function MobileStickyBar({
  summary,
  onOrderClick,
  isVisible = true,
}: MobileStickyBarProps) {
  const scrollToForm = () => {
    const formSection = document.getElementById("order-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
    onOrderClick();
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl transform transition-transform duration-300 md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        {/* Price Info */}
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-purple-600">
              {formatPrice(summary.total)}
            </span>
            {summary.savings > 0 && (
              <span className="text-xs text-green-600 font-medium">
                -{formatPrice(summary.savings)}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">
            {summary.quantity} قطعة • شامل التوصيل
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToForm}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>اطلبي الآن</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Safe Area Padding for iPhone */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </div>
  );
}

export default MobileStickyBar;
