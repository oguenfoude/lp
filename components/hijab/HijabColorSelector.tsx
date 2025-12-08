/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Color Selector Component
 * Circular color swatches with double-ring selection
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HijabColor } from "@/lib/types/hijab";
import { HIJAB_COLORS } from "@/lib/config/hijab";

interface HijabColorSelectorProps {
  selectedColor: HijabColor | null;
  onSelect: (color: HijabColor) => void;
  error?: string;
}

export function HijabColorSelector({
  selectedColor,
  onSelect,
  error,
}: HijabColorSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-600" />
          اختاري اللون
        </h3>
        {selectedColor && (
          <span className="text-sm text-purple-600 font-medium">
            {selectedColor.nameAr}
          </span>
        )}
      </div>

      {/* Color Swatches */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {HIJAB_COLORS.map((color) => {
          const isSelected = selectedColor?.id === color.id;
          const isLight = color.hex === "#F5F5DC" || color.hex === "#FFFFFF";

          return (
            <button
              key={color.id}
              onClick={() => onSelect(color)}
              className={cn(
                "relative w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-200",
                // Double ring effect for selected
                isSelected && "ring-2 ring-purple-500 ring-offset-4"
              )}
              title={color.nameAr}
              aria-label={`اختيار لون ${color.nameAr}`}
            >
              {/* Color Circle */}
              <span
                className={cn(
                  "absolute inset-0 rounded-full shadow-md transition-transform hover:scale-110",
                  isSelected && "scale-105",
                  isLight && "border border-gray-200"
                )}
                style={{ backgroundColor: color.hex }}
              />

              {/* Check mark for selected */}
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6",
                      isLight ? "text-gray-700" : "text-white"
                    )}
                    strokeWidth={3}
                  />
                </span>
              )}

              {/* Color Name Tooltip (Desktop) */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                {color.nameAr}
              </span>
            </button>
          );
        })}
      </div>

      {/* Color Names Grid (Mobile) */}
      <div className="flex flex-wrap gap-2 justify-center md:hidden">
        {HIJAB_COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => onSelect(color)}
            className={cn(
              "px-3 py-1 rounded-full text-sm transition-colors",
              selectedColor?.id === color.id
                ? "bg-purple-100 text-purple-700 font-medium"
                : "bg-gray-100 text-gray-600"
            )}
          >
            {color.nameAr}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}

export default HijabColorSelector;
