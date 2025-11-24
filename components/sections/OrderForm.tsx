"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cong } from "@/lib/config/cong";
import { WILAYAS } from "@/lib/data/wilayas";
import { useOrderForm } from "./OrderForm/useOrderForm";
import OrderSummary from "./OrderForm/OrderSummary";
import { formatPrice } from "@/lib/utils";

export default function OrderForm() {
  const {
    formData,
    errors,
    deliveryPrice,
    productSubtotal,
    totalPrice,
    handleChange,
    handleSubmit,
  } = useOrderForm();

  return (
    <section id="order-form" className="py-12 md:py-16 bg-white">
      <div className="container-custom max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{cong.form.title}</h2>

        <Card className="p-6 md:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-10">
              {/* Section: Basic Info */}
              <div className="space-y-5">
                <h3 className="text-xl font-semibold">المعلومات الأساسية</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName" className="mb-2 block text-sm font-medium">الاسم الكامل *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      placeholder="اكتب اسمك الكامل"
                      onChange={e => handleChange("fullName", e.target.value)}
                       aria-invalid={!!errors.fullName}
                       aria-describedby={errors.fullName ? "error-fullName" : undefined}
                       className={errors.fullName ? "border-red-500" : ""}
                    />
                      {errors.fullName && <p id="error-fullName" className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block text-sm font-medium">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      placeholder="مثال: 0555123456"
                      onChange={e => handleChange("phone", e.target.value)}
                       aria-invalid={!!errors.phone}
                       aria-describedby={errors.phone ? "error-phone" : undefined}
                       className={errors.phone ? "border-red-500" : ""}
                    />
                      {errors.phone && <p id="error-phone" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Section: Location */}
              <div className="space-y-5">
                <h3 className="text-xl font-semibold">الموقع</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <Label htmlFor="wilaya" className="mb-2 block text-sm font-medium">الولاية *</Label>
                    <select
                      id="wilaya"
                      value={formData.wilaya}
                      onChange={e => handleChange("wilaya", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${errors.wilaya ? "border-red-500" : "border-[var(--color-border)]"}`}
                       aria-invalid={!!errors.wilaya}
                       aria-describedby={errors.wilaya ? "error-wilaya" : undefined}
                    >
                      <option value="">اختر الولاية</option>
                      {WILAYAS.map((name: string, idx: number) => {
                        const code = String(idx + 1).padStart(2, "0");
                        return (
                          <option key={idx} value={code}>
                            {code} - {name}
                          </option>
                        );
                      })}
                    </select>
                      {errors.wilaya && <p id="error-wilaya" className="text-red-500 text-xs mt-1">{errors.wilaya}</p>}
                  </div>
                  <div>
                    <Label htmlFor="commune" className="mb-2 block text-sm font-medium">البلدية *</Label>
                    <Input
                      id="commune"
                      type="text"
                      value={formData.commune}
                      placeholder="اكتب البلدية"
                      onChange={e => handleChange("commune", e.target.value)}
                       aria-invalid={!!errors.commune}
                       aria-describedby={errors.commune ? "error-commune" : undefined}
                       className={errors.commune ? "border-red-500" : ""}
                    />
                      {errors.commune && <p id="error-commune" className="text-red-500 text-xs mt-1">{errors.commune}</p>}
                  </div>
                </div>
              </div>

              {/* Section: Delivery Type */}
              <div className="space-y-5">
                <h3 className="text-xl font-semibold">طريقة التوصيل</h3>
                <div className="space-y-3">
                  {cong.delivery.types.map(type => (
                    <label
                      key={type.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:border-black ${formData.deliveryType === type.id ? "border-black bg-gray-50" : "border-[var(--color-border)]"}`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryType"
                          value={type.id}
                          checked={formData.deliveryType === type.id}
                          onChange={e => handleChange("deliveryType", e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <div>
                          <div className="font-medium text-sm">{type.label}</div>
                          {type.description && <div className="text-xs text-[var(--color-muted)] mt-0.5">{type.description}</div>}
                        </div>
                      </div>
                      <div className="font-bold text-sm">{formatPrice(type.fee)}</div>
                    </label>
                  ))}
                </div>
                {formData.deliveryType === "home" && (
                  <div>
                    <Label htmlFor="address" className="mb-2 block text-sm font-medium">العنوان الكامل *</Label>
                    <textarea
                      id="address"
                      rows={3}
                      value={formData.address}
                      placeholder="اكتب العنوان الكامل (شارع، رقم منزل، معلم قريب...)"
                      onChange={e => handleChange("address", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none ${errors.address ? "border-red-500" : "border-[var(--color-border)]"}`}
                       aria-invalid={!!errors.address}
                       aria-describedby={errors.address ? "error-address" : undefined}
                    />
                      {errors.address && <p id="error-address" className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                )}
              </div>

              {/* Section: Quantity */}
              <div className="space-y-5">
                <h3 className="text-xl font-semibold">الكمية</h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleChange("quantity", Math.max(1, formData.quantity - 1))}
                    disabled={formData.quantity <= 1}
                    className="w-12 h-12 border border-[var(--color-border)] rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xl"
                  >−</button>
                  <div className="flex-1 text-center font-bold text-xl">{formData.quantity}</div>
                  <button
                    type="button"
                    onClick={() => handleChange("quantity", formData.quantity + 1)}
                    className="w-12 h-12 border border-[var(--color-border)] rounded-md hover:bg-gray-50 font-bold text-xl"
                  >+</button>
                </div>
              </div>

              {/* Section: Summary */}
              <OrderSummary
                productSubtotal={productSubtotal}
                deliveryPrice={deliveryPrice}
                totalPrice={totalPrice}
                quantity={formData.quantity}
              />

              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/80 text-white font-semibold py-6 text-lg"
              >
                {cong.form.submitButton}
              </Button>
            </form>
        </Card>
      </div>
    </section>
  );
}
