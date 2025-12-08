/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Size Selector Component
 * Size selection with size guide
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { Check, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HijabSize } from "@/lib/types/hijab";
import { HIJAB_SIZES } from "@/lib/config/hijab";

interface HijabSizeSelectorProps {
  selectedSize: HijabSize | null;
  onSelect: (size: HijabSize) => void;
  error?: string;
}

export function HijabSizeSelector({
  selectedSize,
  onSelect,
  error,
}: HijabSizeSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Ruler className="w-5 h-5 text-purple-600" />
          اختاري المقاس
        </h3>
        {selectedSize && (
          <span className="text-sm text-purple-600 font-medium">
            {selectedSize.nameAr} ({selectedSize.range})
          </span>
        )}
      </div>

      {/* Size Buttons */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {HIJAB_SIZES.map((size) => {
          const isSelected = selectedSize?.id === size.id;

          return (
            <button
              key={size.id}
              onClick={() => onSelect(size)}
              className={cn(
                "relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border-2 transition-all duration-200",
                isSelected
                  ? "border-purple-500 bg-purple-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm"
              )}
            >
              {/* Selection Check */}
              {isSelected && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
              )}

              {/* Size Label */}
              <span
                className={cn(
                  "text-xl md:text-2xl font-bold",
                  isSelected ? "text-purple-600" : "text-gray-700"
                )}
              >
                {size.label}
              </span>

              {/* Size Range */}
              <span className="text-xs text-gray-400 mt-1">
                {size.range}
              </span>
            </button>
          );
        })}
      </div>

      {/* Size Guide */}
      <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-2">
        <Ruler className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-600">دليل المقاسات:</span>
          <ul className="mt-1 space-y-0.5 text-xs">
            <li>M (36-38): للجسم النحيف</li>
            <li>L (40-42): المقاس الأكثر طلباً</li>
            <li>XL (44-46): مقاس مريح</li>
            <li>XXL (48-50): للمقاسات الكبيرة</li>
          </ul>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}

export default HijabSizeSelector;
