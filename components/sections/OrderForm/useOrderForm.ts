"use client";
import { useState } from "react";
import { cong } from "@/lib/config/cong";
import { useOrder } from "@/lib/context/OrderContext";

export interface OrderFormData {
  fullName: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  deliveryType: string;
  quantity: number;
  color: string;
  size: string;
}

export function useOrderForm() {
  const { showSuccess, showLoading, hideLoading } = useOrder();
  
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    phone: "",
    wilaya: "",
    commune: "",
    address: "",
    deliveryType: cong.delivery.types[0]?.id || "home",
    quantity: 1,
    color: "",
    size: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  const selectedDeliveryType = cong.delivery.types.find(t => t.id === formData.deliveryType);
  const deliveryPrice = typeof selectedDeliveryType?.fee === "number" ? selectedDeliveryType.fee : 0;
  const productSubtotal = cong.product.price; // Always 1 quantity
  const totalPrice = productSubtotal + deliveryPrice;

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field as keyof OrderFormData]: value }));
    if (errors[field as keyof OrderFormData]) {
      setErrors(prev => ({ ...prev, [field as keyof OrderFormData]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = cong.form.validation.fullNameRequired;
    }

    const phoneRegex = /^(05|06|07)[0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = cong.form.validation.phoneInvalid;
    }

    if (!formData.wilaya) {
      newErrors.wilaya = cong.form.validation.wilayaRequired;
    }

    if (!formData.commune.trim()) {
      newErrors.commune = cong.form.validation.communeRequired;
    }

    // Color and Size validation
    if (!formData.color) {
      newErrors.color = "اللون مطلوب";
    }

    if (!formData.size) {
      newErrors.size = "المقاس مطلوب";
    }

    // Address required only if delivery type is 'home'
    if (formData.deliveryType === "home" && !formData.address.trim()) {
      newErrors.address = cong.form.validation.addressRequired;
    }

    setErrors(newErrors);
    const keys = Object.keys(newErrors) as (keyof OrderFormData)[];
    if (keys.length) {
      // Smooth scroll to first error field
      const first = keys[0];
      requestAnimationFrame(() => {
        const el = document.getElementById(first);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          (el as HTMLElement).focus?.();
        }
      });
    }
    return keys.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    showLoading(cong.form.submitButtonLoading);
    try {
      const res = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: cong.product.name,
          productPrice: cong.product.price,
          quantity: 1, // Always 1
          deliveryType: formData.deliveryType,
          deliveryFee: deliveryPrice,
          total: totalPrice,
          customerName: formData.fullName,
          phone: formData.phone,
          wilaya: formData.wilaya,
          baldia: formData.commune,
          address: formData.address || undefined,
          color: formData.color,
          size: formData.size,
        }),
      });

      if (!res.ok) throw new Error("فشل إرسال الطلب");

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        wilaya: "",
        commune: "",
        address: "",
        deliveryType: cong.delivery.types[0]?.id || "home",
        quantity: 1,
        color: "",
        size: "",
      });

      // Show success modal
      showSuccess();
    } catch (err) {
      alert(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      hideLoading();
    }
  };

  return {
    formData,
    errors,
    deliveryPrice,
    productSubtotal,
    totalPrice,
    handleChange,
    handleSubmit,
  };
}
