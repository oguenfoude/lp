/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Order Form Component
 * Customer information form with wilaya selector
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { useState } from "react";
import { User, Phone, MapPin, Home, Building2, Loader2, Send, ChevronDown, Search, Truck, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeliveryType } from "@/lib/types/hijab";
// Wilaya type used internally
import { WILAYAS_DZ, DELIVERY_TYPES } from "@/lib/config/hijab";

interface FormInputProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  dir?: "rtl" | "ltr";
  required?: boolean;
}

function FormInput({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  dir = "rtl",
  required = false,
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="relative">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className={cn(
            "w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-colors text-right",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-200 bg-white hover:border-purple-300"
          )}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="text-red-400">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// WILAYA SELECTOR
// ════════════════════════════════════════════════════════════════

interface WilayaSelectorProps {
  selectedWilayaId: number | null;
  onSelect: (wilayaId: number) => void;
  error?: string;
}

function WilayaSelector({ selectedWilayaId, onSelect, error }: WilayaSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedWilaya = WILAYAS_DZ.find((w) => w.id === selectedWilayaId);

  const filteredWilayas = WILAYAS_DZ.filter(
    (w) =>
      w.nameAr.includes(search) ||
      w.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      w.code.includes(search)
  ).sort((a, b) => parseInt(a.code) - parseInt(b.code));

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        الولاية
        <span className="text-red-500 mr-1">*</span>
      </label>

      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full pr-10 pl-4 py-3 rounded-xl border-2 transition-colors text-right flex items-center justify-between",
            error
              ? "border-red-300 bg-red-50"
              : isOpen
              ? "border-purple-500 ring-2 ring-purple-500"
              : "border-gray-200 bg-white hover:border-purple-300"
          )}
        >
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
          />
          <span className="flex items-center gap-2">
            {selectedWilaya ? (
              <>
                <span className="text-gray-800">{selectedWilaya.nameAr}</span>
                <span className="text-xs text-gray-400">({selectedWilaya.code})</span>
              </>
            ) : (
              <span className="text-gray-400">اختاري الولاية</span>
            )}
            <MapPin className="w-5 h-5 text-gray-400" />
          </span>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border-2 border-purple-200 shadow-xl max-h-72 overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحثي عن ولايتك..."
                  className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-purple-400"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Options */}
            <div className="max-h-52 overflow-y-auto">
              {filteredWilayas.length > 0 ? (
                filteredWilayas.map((wilaya) => (
                  <button
                    key={wilaya.id}
                    type="button"
                    onClick={() => {
                      onSelect(wilaya.id);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-right flex items-center justify-between hover:bg-purple-50 transition-colors",
                      selectedWilayaId === wilaya.id && "bg-purple-100"
                    )}
                  >
                    <span className="text-sm text-gray-500">
                      {wilaya.deliveryFee} دج
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-gray-800">{wilaya.nameAr}</span>
                      <span className="text-xs text-gray-400 font-mono">
                        {wilaya.code}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  لا توجد نتائج
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delivery Info */}
      {selectedWilaya && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center justify-between">
          <span className="text-sm text-green-700 font-medium">
            {selectedWilaya.deliveryFee} دج
          </span>
          <span className="text-xs text-green-600 flex items-center gap-1">
            <Truck className="w-4 h-4" />
            <span>{selectedWilaya.deliveryDays}</span>
          </span>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="text-red-400">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN FORM COMPONENT
// ════════════════════════════════════════════════════════════════

interface HijabOrderFormProps {
  // Customer Info
  fullName: string;
  phone: string;
  wilayaId: number | null;
  commune: string;
  address: string;
  deliveryType: DeliveryType | null;

  // Setters
  onFullNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onWilayaChange: (wilayaId: number) => void;
  onCommuneChange: (commune: string) => void;
  onAddressChange: (address: string) => void;
  onDeliveryTypeChange: (type: DeliveryType) => void;

  // Errors
  errors: {
    fullName?: string;
    phone?: string;
    wilayaId?: string;
    commune?: string;
    address?: string;
  };

  // Submit
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function HijabOrderForm({
  fullName,
  phone,
  wilayaId,
  commune,
  address,
  deliveryType,
  onFullNameChange,
  onPhoneChange,
  onWilayaChange,
  onCommuneChange,
  onAddressChange,
  onDeliveryTypeChange,
  errors,
  isSubmitting,
  onSubmit,
}: HijabOrderFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Section Header */}
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <FileText className="w-5 h-5 text-purple-600" />
        معلومات التوصيل
      </h3>

      {/* Full Name */}
      <FormInput
        id="fullName"
        label="الاسم الكامل"
        icon={<User className="w-5 h-5" />}
        value={fullName}
        onChange={onFullNameChange}
        placeholder="أدخلي اسمك الكامل"
        error={errors.fullName}
        required
      />

      {/* Phone */}
      <FormInput
        id="phone"
        label="رقم الهاتف"
        icon={<Phone className="w-5 h-5" />}
        value={phone}
        onChange={onPhoneChange}
        placeholder="05XXXXXXXX"
        error={errors.phone}
        type="tel"
        dir="ltr"
        required
      />

      {/* Wilaya */}
      <WilayaSelector
        selectedWilayaId={wilayaId}
        onSelect={onWilayaChange}
        error={errors.wilayaId}
      />

      {/* Delivery Type Selector - Show only after wilaya is selected */}
      {wilayaId && (
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            نوع التوصيل
            <span className="text-red-500 mr-1">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {DELIVERY_TYPES.map((type) => {
              const isSelected = deliveryType?.id === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => onDeliveryTypeChange(type)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-right",
                    isSelected
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-gray-200 hover:border-purple-300 bg-white"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      isSelected ? "border-purple-500" : "border-gray-300"
                    )}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <div className="text-base font-bold text-gray-800">
                      {type.labelAr}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{type.descriptionAr}</p>
                  <p className="text-sm font-bold text-purple-600">
                    {type.feeModifier > 0 ? `+${type.feeModifier} دج` : "بدون رسوم إضافية"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Commune */}
      <FormInput
        id="commune"
        label="البلدية"
        icon={<Building2 className="w-5 h-5" />}
        value={commune}
        onChange={onCommuneChange}
        placeholder="أدخلي اسم البلدية"
        error={errors.commune}
        required
      />

      {/* Address - Show only if Home delivery is selected */}
      {deliveryType?.requiresAddress && (
        <FormInput
          id="address"
          label="العنوان"
          icon={<Home className="w-5 h-5" />}
          value={address}
          onChange={onAddressChange}
          placeholder="الحي، الشارع، رقم المنزل..."
          error={errors.address}
          required
        />
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full py-4 rounded-xl text-lg font-bold transition-all duration-200 flex items-center justify-center gap-2",
          isSubmitting
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            جاري إرسال الطلب...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            تأكيد الطلب
          </>
        )}
      </button>

      {/* Policies */}
      <div className="text-center space-y-1 pt-2">
        <p className="text-xs text-gray-400">
          ✓ التوصيل متوفر لجميع الولايات الـ 58
        </p>
        <p className="text-xs text-gray-400">
          ✓ الدفع عند الاستلام
        </p>
      </div>
    </form>
  );
}

export default HijabOrderForm;
