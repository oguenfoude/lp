"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteData } from "@/lib/data/site-data";
import { WILAYAS } from "@/lib/data/wilayas";
import { formatPrice, calculateTotal } from "@/lib/utils";
import type { OrderFormData, FormErrors, DeliveryType } from "@/types";

// ====================
// Order Form Component
// نموذج الطلب مع التحقق من الصحة
// ====================

export default function OrderForm() {
  const { product, deliveryTypes, orderFormTexts } = siteData;

  // State لبيانات النموذج
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    phone: "",
    city: "", // احتياطي في حال أردنا حقلاً منفصلاً مستقبلاً
    address: "",
    notes: "",
    wilaya: "",
    baldia: "",
    deliveryType: deliveryTypes[0]?.id || "standard",
    quantity: 1,
  });

  // State للأخطاء
  const [errors, setErrors] = useState<FormErrors>({});

  // State لحالة الإرسال
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // حساب الإجمالي
  const selectedDelivery: DeliveryType | undefined = deliveryTypes.find(d => d.id === formData.deliveryType);
  const deliveryFee = selectedDelivery ? selectedDelivery.fee : product.deliveryFee;
  // تم إلغاء استخدام deliveryTime في التكامل الحالي (محذوف لتجنب تحذير غير مستخدم)
  const total = calculateTotal(product.price, deliveryFee, formData.quantity);

  // Zod Schema
  const orderSchema = z.object({
    name: z.string().trim().min(3).max(50).regex(/^[a-zA-Z\u0600-\u06FF\s]+$/),
    phone: z.string().transform(v => v.replace(/[^0-9]/g, "")).refine(v => /^0(5|6|7)\d{8}$/.test(v), orderFormTexts.phoneInvalidMsg),
    wilaya: z.string().min(1, orderFormTexts.wilayaRequiredMsg),
    baldia: z.string().min(1, orderFormTexts.baldiaRequiredMsg),
    deliveryType: z.string().min(1),
    quantity: z.number().int().min(1, orderFormTexts.quantityRequiredMsg || "الكمية مطلوبة").max(99).refine(v => v > 0, orderFormTexts.quantityInvalidMsg || "كمية غير صالحة"),
    address: z.string().optional(),
    notes: z.string().optional(),
    city: z.string().optional(),
  });

  // دالة التحقق من صحة الحقل الواحد
  // إزالة التحقق الأحادي القديم (لم يعد مستخدماً بعد اعتماد Zod)
  // ترك دالة فارغة لتفادي تغيير كبير في البنية في حال أستخدم لاحقاً
  // لم يعد مطلوباً بعد الاعتماد الكامل على Zod
  // (مزال لتجنب تحذير المتغير غير المستخدم)

  // دالة تغيير قيمة الحقل
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;
    if (name === "phone") {
      // حصر الرقم على 10 أرقام فقط
      const digits = value.replace(/[^0-9]/g, "").slice(0, 10);
      newValue = digits;
    }
    if (name === "quantity") {
      const numStr = value.replace(/[^0-9]/g, "").slice(0, 2);
      newValue = numStr ? parseInt(numStr) : 1; // حافظ على قيمة افتراضية صالحة
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // إزالة الخطأ عند البدء بالكتابة
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // بناء مخطط ديناميكي مع شرط العنوان إذا نوع التوصيل "home"
  const buildSchema = () => {
    if (formData.deliveryType === "home") {
      return orderSchema.extend({
        address: z.string().trim().min(1, orderFormTexts.addressRequiredMsg).min(10, orderFormTexts.addressInvalidMsg),
      });
    }
    return orderSchema;
  };

  // التحقق باستخدام Zod بدلاً من التحقق اليدوي
  const validateForm = (): boolean => {
    const schema = buildSchema();
    const result = schema.safeParse(formData);
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof FormErrors;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  // دالة إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من صحة النموذج
    if (!validateForm()) {
      return;
    }

    // بدء الإرسال
    setIsSubmitting(true);

    try {
      // إعداد بيانات الطلب
      const orderData = {
        // تم حذف storeName و deliveryTime حسب الطلب لتقليل الأعمدة في الشيت
        productName: product.name,
        productPrice: product.price,
        quantity: formData.quantity,
        deliveryType: selectedDelivery?.label || formData.deliveryType,
        deliveryFee: deliveryFee,
        total: total,
        customerName: formData.name,
        phone: formData.phone,
        wilaya: formData.wilaya,
        baldia: formData.baldia,
        address: formData.address || "",
        notes: formData.notes || "",
      };

      // إرسال الطلب إلى API
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "فشل إرسال الطلب");
      }

      // إظهار رسالة النجاح
      setIsSuccess(true);

      // إعادة تعيين النموذج بعد 3 ثوان
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          city: "",
          address: "",
          notes: "",
          wilaya: "",
          baldia: "",
          deliveryType: deliveryTypes[0]?.id || "standard",
          quantity: 1,
        });
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Error submitting order:", error);
      // يمكن إضافة رسالة خطأ للمستخدم هنا
      alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-16 md:py-24 bg-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">{orderFormTexts.title}</h2>
          <p className="text-gray-600 text-lg">{orderFormTexts.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form - Left Side (2 columns) */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name">{orderFormTexts.nameLabel}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-black" : ""}
                      placeholder={orderFormTexts.namePlaceholder}
                    />
                    {errors.name && <p className="text-black text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">{orderFormTexts.phoneLabel}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-black" : ""}
                      placeholder={orderFormTexts.phonePlaceholder}
                    />
                    {errors.phone && <p className="text-black text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Wilaya */}
                  <div>
                    <Label htmlFor="wilaya">{orderFormTexts.wilayaLabel}</Label>
                    <select
                      id="wilaya"
                      name="wilaya"
                      value={formData.wilaya}
                      onChange={handleChange}
                      className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.wilaya ? "border-black" : ""}`}
                    >
                      <option value="">{orderFormTexts.wilayaPlaceholder}</option>
                      {WILAYAS.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                    {errors.wilaya && <p className="text-black text-sm mt-1">{errors.wilaya}</p>}
                  </div>

                  {/* Baldia */}
                  <div>
                    <Label htmlFor="baldia">{orderFormTexts.baldiaLabel}</Label>
                    <Input
                      id="baldia"
                      name="baldia"
                      type="text"
                      value={formData.baldia}
                      onChange={handleChange}
                      className={errors.baldia ? "border-black" : ""}
                      placeholder={orderFormTexts.baldiaPlaceholder}
                    />
                    {errors.baldia && <p className="text-black text-sm mt-1">{errors.baldia}</p>}
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label htmlFor="quantity">{orderFormTexts.quantityLabel || "الكمية"}</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="text"
                      inputMode="numeric"
                      value={formData.quantity === 0 ? "" : formData.quantity}
                      onChange={handleChange}
                      className={errors.quantity ? "border-black" : ""}
                      placeholder={orderFormTexts.quantityPlaceholder || "1"}
                    />
                    {errors.quantity && <p className="text-black text-sm mt-1">{errors.quantity}</p>}
                  </div>

                  {/* Delivery Type */}
                  <div>
                    <Label>{orderFormTexts.deliveryTypeLabel}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {deliveryTypes.map(dt => (
                        <label
                          key={dt.id}
                          className={`flex items-center gap-2 rounded-md border p-3 cursor-pointer transition ${formData.deliveryType === dt.id ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" : "hover:border-[var(--color-primary)]"}`}
                        >
                          <input
                            type="radio"
                            name="deliveryType"
                            value={dt.id}
                            checked={formData.deliveryType === dt.id}
                            onChange={handleChange}
                            className="accent-[var(--color-primary)]"
                          />
                          <span className="text-sm font-medium">{dt.label}</span>
                          <span className="ml-auto text-xs text-gray-600">{formatPrice(dt.fee)}</span>
                        </label>
                      ))}
                    </div>
                    {errors.deliveryType && <p className="text-black text-sm mt-1">{errors.deliveryType}</p>}
                  </div>

                  {/* Address (only if home delivery) - moved below delivery type for clarity */}
                  {formData.deliveryType === "home" && (
                    <div>
                      <Label htmlFor="address">{orderFormTexts.addressLabel}</Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? "border-black" : ""}
                        placeholder={orderFormTexts.addressPlaceholder}
                      />
                      {errors.address && <p className="text-black text-sm mt-1">{errors.address}</p>}
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">{orderFormTexts.notesLabel}</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder={orderFormTexts.notesPlaceholder}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-black hover:bg-black/80 text-white font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? orderFormTexts.processingText : orderFormTexts.submitText}
                  </Button>

                  {/* Success Message */}
                  {isSuccess && (
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-black font-semibold">{orderFormTexts.successMessage}</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - Right Side (1 column) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{orderFormTexts.summaryTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Info */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">{orderFormTexts.productLabel}</p>
                  <p className="font-semibold text-[var(--color-dark)]">
                    {product.name}
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{orderFormTexts.priceLabel}</span>
                    <span className="font-medium">{formatPrice(product.price)} × {formData.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{orderFormTexts.deliveryLabel}</span>
                    <span className="font-medium">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-lg font-bold text-[var(--color-dark)]">{orderFormTexts.totalLabel}</span>
                    <span className="text-lg font-bold text-[var(--color-primary)]">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Delivery Time removed per request */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
