/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Order Calculator Hook
 * Real-time state management for order form
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import type { HijabColor, HijabSize, BundleOption, OrderState, OrderSummary, FormErrors, DeliveryType } from "@/lib/types/hijab";
import {
  HIJAB_PRODUCT,
  WILAYAS_DZ,
  HIJAB_BUNDLES,
  DELIVERY_TYPES,
  getWilayaById,
  getDeliveryFee,
  isValidPhone,
} from "@/lib/config/hijab";

// ════════════════════════════════════════════════════════════════
// INITIAL STATE
// ════════════════════════════════════════════════════════════════

const initialState: OrderState = {
  // Customer Info
  fullName: "",
  phone: "",
  wilayaId: null,
  commune: "",
  address: "",
  deliveryType: DELIVERY_TYPES[0], // Default: Desk delivery (no extra fee)
  
  // Product Selection - Default to first options
  selectedColor: null,
  selectedSize: null,
  selectedBundle: HIJAB_BUNDLES[0], // Default: 1 piece
  
  // Calculated
  subtotal: HIJAB_BUNDLES[0].price,
  deliveryFee: 0,
  total: HIJAB_BUNDLES[0].price,
  savings: 0,
};

// ════════════════════════════════════════════════════════════════
// MAIN HOOK
// ════════════════════════════════════════════════════════════════

export function useOrderCalculator() {
  const [state, setState] = useState<OrderState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ══════════════════════════════════════════════════════════════
  // SETTERS
  // ══════════════════════════════════════════════════════════════

  const setFullName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, fullName: name }));
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: undefined }));
    }
  }, [errors.fullName]);

  const setPhone = useCallback((phone: string) => {
    setState((prev) => ({ ...prev, phone }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  }, [errors.phone]);

  const setCommune = useCallback((commune: string) => {
    setState((prev) => ({ ...prev, commune }));
    if (errors.commune) {
      setErrors((prev) => ({ ...prev, commune: undefined }));
    }
  }, [errors.commune]);

  const setAddress = useCallback((address: string) => {
    setState((prev) => ({ ...prev, address }));
  }, []);

  /**
   * Select wilaya - recalculates delivery fee and total
   */
  const selectWilaya = useCallback((wilayaId: number) => {
    setState((prev) => {
      const baseWilayaFee = getDeliveryFee(wilayaId);
      const deliveryTypeFee = prev.deliveryType?.feeModifier ?? 0;
      const totalDeliveryFee = baseWilayaFee + deliveryTypeFee;
      
      return {
        ...prev,
        wilayaId,
        deliveryFee: totalDeliveryFee,
        total: prev.subtotal + totalDeliveryFee,
      };
    });
    if (errors.wilayaId) {
      setErrors((prev) => ({ ...prev, wilayaId: undefined }));
    }
  }, [errors.wilayaId]);

  /**
   * Select delivery type - recalculates delivery fee with modifier
   */
  const selectDeliveryType = useCallback((deliveryType: DeliveryType) => {
    setState((prev) => {
      const baseWilayaFee = prev.wilayaId ? getDeliveryFee(prev.wilayaId) : 0;
      const deliveryTypeFee = deliveryType.feeModifier;
      const totalDeliveryFee = baseWilayaFee + deliveryTypeFee;
      
      return {
        ...prev,
        deliveryType,
        deliveryFee: totalDeliveryFee,
        total: prev.subtotal + totalDeliveryFee,
        // Clear address if desk delivery (no address needed)
        address: deliveryType.requiresAddress ? prev.address : "",
      };
    });
  }, []);

  /**
   * Select color
   */
  const selectColor = useCallback((color: HijabColor) => {
    setState((prev) => ({ ...prev, selectedColor: color }));
    if (errors.color) {
      setErrors((prev) => ({ ...prev, color: undefined }));
    }
  }, [errors.color]);

  /**
   * Select size
   */
  const selectSize = useCallback((size: HijabSize) => {
    setState((prev) => ({ ...prev, selectedSize: size }));
    if (errors.size) {
      setErrors((prev) => ({ ...prev, size: undefined }));
    }
  }, [errors.size]);

  /**
   * Select bundle - recalculates subtotal and total
   */
  const selectBundle = useCallback((bundle: BundleOption) => {
    setState((prev) => ({
      ...prev,
      selectedBundle: bundle,
      subtotal: bundle.price,
      total: bundle.price + prev.deliveryFee,
      savings: bundle.savings,
    }));
  }, []);

  // ══════════════════════════════════════════════════════════════
  // VALIDATION
  // ══════════════════════════════════════════════════════════════

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!state.fullName.trim()) {
      newErrors.fullName = "الاسم مطلوب";
      isValid = false;
    } else if (state.fullName.trim().length < 3) {
      newErrors.fullName = "الاسم قصير جداً";
      isValid = false;
    }

    // Phone validation
    if (!state.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
      isValid = false;
    } else if (!isValidPhone(state.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح (يجب أن يبدأ بـ 05، 06، أو 07)";
      isValid = false;
    }

    // Wilaya validation
    if (!state.wilayaId) {
      newErrors.wilayaId = "الولاية مطلوبة";
      isValid = false;
    }

    // Commune validation
    if (!state.commune.trim()) {
      newErrors.commune = "البلدية مطلوبة";
      isValid = false;
    }

    // Address validation (required for home delivery)
    if (state.deliveryType?.requiresAddress && !state.address.trim()) {
      newErrors.address = "العنوان مطلوب للتوصيل إلى المنزل";
      isValid = false;
    }

    // Color validation
    if (!state.selectedColor) {
      newErrors.color = "اللون مطلوب";
      isValid = false;
    }

    // Size validation
    if (!state.selectedSize) {
      newErrors.size = "المقاس مطلوب";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [state]);

  // ══════════════════════════════════════════════════════════════
  // COMPUTED VALUES
  // ══════════════════════════════════════════════════════════════

  const selectedWilaya = useMemo(() => {
    return state.wilayaId ? getWilayaById(state.wilayaId) : null;
  }, [state.wilayaId]);

  const orderSummary = useMemo((): OrderSummary => {
    return {
      productName: HIJAB_PRODUCT.titleAr,
      quantity: state.selectedBundle?.quantity ?? 1,
      color: state.selectedColor?.nameAr ?? "غير محدد",
      size: state.selectedSize?.label ?? "غير محدد",
      subtotal: state.subtotal,
      deliveryFee: state.deliveryFee,
      total: state.total,
      savings: state.savings,
      savingsPercent: state.selectedBundle?.savingsPercent ?? 0,
      wilayaName: selectedWilaya?.nameAr ?? "",
      deliveryType: state.deliveryType?.labelAr ?? "",
    };
  }, [state, selectedWilaya]);

  const isFormComplete = useMemo(() => {
    return (
      state.fullName.trim().length > 0 &&
      state.phone.trim().length > 0 &&
      state.wilayaId !== null &&
      state.commune.trim().length > 0 &&
      state.selectedColor !== null &&
      state.selectedSize !== null
    );
  }, [state]);

  // ══════════════════════════════════════════════════════════════
  // RESET
  // ══════════════════════════════════════════════════════════════

  const resetForm = useCallback(() => {
    setState(initialState);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  // ══════════════════════════════════════════════════════════════
  // RETURN API
  // ══════════════════════════════════════════════════════════════

  return {
    // State
    state,
    errors,
    isSubmitting,
    setIsSubmitting,
    
    // Setters
    setFullName,
    setPhone,
    setCommune,
    setAddress,
    selectWilaya,
    selectDeliveryType,
    selectColor,
    selectSize,
    selectBundle,
    
    // Computed
    selectedWilaya,
    orderSummary,
    isFormComplete,
    
    // Available options
    availableColors: HIJAB_PRODUCT.colors,
    availableSizes: HIJAB_PRODUCT.sizes,
    availableBundles: HIJAB_BUNDLES,
    availableWilayas: WILAYAS_DZ,
    availableDeliveryTypes: DELIVERY_TYPES,
    product: HIJAB_PRODUCT,
    
    // Actions
    validateForm,
    resetForm,
  };
}

// Export type for use in components
export type OrderCalculator = ReturnType<typeof useOrderCalculator>;
