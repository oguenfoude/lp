/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Bundle Selector Component
 * Select quantity bundles with savings display
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { Check, Sparkles, Package, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BundleOption } from "@/lib/types/hijab";
import { formatPrice, HIJAB_BUNDLES } from "@/lib/config/hijab";

interface HijabBundleSelectorProps {
  selectedBundle: BundleOption | null;
  onSelect: (bundle: BundleOption) => void;
}

export function HijabBundleSelector({
  selectedBundle,
  onSelect,
}: HijabBundleSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <Package className="w-5 h-5 text-purple-600" />
        اختاري الكمية
      </h3>

      {/* Bundle Cards */}
      <div className="grid grid-cols-1 gap-3">
        {HIJAB_BUNDLES.map((bundle) => {
          const isSelected = selectedBundle?.id === bundle.id;

          return (
            <button
              key={bundle.id}
              onClick={() => onSelect(bundle)}
              className={cn(
                "relative w-full p-4 rounded-xl border-2 transition-all duration-200 text-right",
                isSelected
                  ? "border-purple-500 bg-purple-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm"
              )}
            >
              {/* Popular Badge */}
              {bundle.isPopular && (
                <div className="absolute -top-2.5 right-4 flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>الأكثر طلباً</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                {/* Left Side: Selection Indicator & Price */}
                <div className="flex items-center gap-3">
                  {/* Selection Circle */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-purple-500 border-purple-500"
                        : "border-gray-300"
                    )}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>

                  {/* Price */}
                  <div className="text-left">
                    <div className="text-xl font-bold text-purple-600">
                      {formatPrice(bundle.price)}
                    </div>
                    {bundle.savings > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        وفّري {formatPrice(bundle.savings)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Bundle Info */}
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {bundle.labelAr}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatPrice(bundle.pricePerUnit)} / القطعة
                  </div>
                </div>
              </div>

              {/* Savings Highlight Bar */}
              {bundle.savingsPercent > 0 && (
                <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-300"
                    style={{ width: `${bundle.savingsPercent * 10}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-1">
        <Lightbulb className="w-4 h-4" />
        كلما زادت الكمية، كلما وفّرتي أكثر!
      </p>
    </div>
  );
}

export default HijabBundleSelector;
