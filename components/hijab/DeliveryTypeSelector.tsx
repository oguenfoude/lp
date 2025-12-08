/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Delivery Type Selector
 * Choose between home or office delivery
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { Home, Building2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeliveryType } from "@/lib/types/hijab";
import { DELIVERY_TYPES } from "@/lib/config/hijab";

interface DeliveryTypeSelectorProps {
  selectedType: DeliveryType | null;
  onSelect: (type: DeliveryType) => void;
}

export function DeliveryTypeSelector({
  selectedType,
  onSelect,
}: DeliveryTypeSelectorProps) {
  const getIcon = (typeId: string) => {
    switch (typeId) {
      case "home":
        return <Home className="w-6 h-6" />;
      case "desk":
        return <Building2 className="w-6 h-6" />;
      default:
        return <Home className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <Home className="w-5 h-5 text-purple-600" />
        مكان التوصيل
      </h3>

      {/* Delivery Type Cards */}
      <div className="grid grid-cols-2 gap-3">
        {DELIVERY_TYPES.map((type) => {
          const isSelected = selectedType?.id === type.id;

          return (
            <button
              key={type.id}
              onClick={() => onSelect(type)}
              className={cn(
                "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                isSelected
                  ? "border-purple-500 bg-purple-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm"
              )}
            >
              {/* Selection Check */}
              {isSelected && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </span>
              )}

              {/* Icon */}
              <span
                className={cn(
                  "mb-2",
                  isSelected ? "text-purple-600" : "text-gray-400"
                )}
              >
                {getIcon(type.id)}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "text-sm font-medium text-center",
                  isSelected ? "text-purple-700" : "text-gray-700"
                )}
              >
                {type.labelAr}
              </span>

              {/* Description */}
              {type.descriptionAr && (
                <span className="text-xs text-gray-400 mt-1 text-center">
                  {type.descriptionAr}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DeliveryTypeSelector;
