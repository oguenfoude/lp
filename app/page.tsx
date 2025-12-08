/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Main Landing Page
 * Single Product Landing Page for Algerian Hijab Market
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { useState, useCallback, useRef } from "react";
import {
  HijabHeader,
  HijabGallery,
  HijabProductInfo,
  HijabBundleSelector,
  HijabColorSelector,
  HijabSizeSelector,
  HijabOrderForm,
  OrderSummary,
  HijabFooter,
  MobileStickyBar,
  SuccessModal,
} from "@/components/hijab";
import { useOrderCalculator } from "@/lib/hooks/useOrderCalculator";
import { getWilayaById } from "@/lib/config/hijab";

export default function Home() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);
  
  const {
    state,
    errors,
    isSubmitting,
    setIsSubmitting,
    setFullName,
    setPhone,
    setCommune,
    setAddress,
    selectWilaya,
    selectDeliveryType,
    selectColor,
    selectSize,
    selectBundle,
    orderSummary,
    validateForm,
    resetForm,
  } = useOrderCalculator();

  const handleSubmit = useCallback(async () => {
    // Clear previous errors
    setSubmitError("");

    // Validate form
    if (!validateForm()) {
      // Scroll to form to show errors
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get wilaya name
      const wilaya = state.wilayaId ? getWilayaById(state.wilayaId) : null;
      
      // Prepare order data
      const orderData = {
        customerName: state.fullName,
        phone: state.phone,
        wilaya: wilaya?.nameAr || "",
        baldia: state.commune,
        address: state.address || "",
        deliveryType: state.deliveryType?.labelAr || "",
        deliveryFee: state.deliveryFee,
        productName: orderSummary.productName,
        productPrice: state.selectedBundle?.pricePerUnit || 0,
        color: state.selectedColor?.nameAr || "",
        size: state.selectedSize?.label || "",
        quantity: state.selectedBundle?.quantity || 1,
        total: state.total,
      };

      // Submit to API
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل إرسال الطلب");
      }

      // Success - show modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Order submission failed:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
      );
      // Scroll to form to show error
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setIsSubmitting(false);
    }
  }, [state, orderSummary, validateForm, setIsSubmitting]);

  const handleSuccessClose = useCallback(() => {
    setShowSuccessModal(false);
    resetForm();
  }, [resetForm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Sticky Header */}
      <HijabHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Hero Section - Product Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column: Gallery */}
          <div className="order-1">
            <HijabGallery />
          </div>

          {/* Right Column: Product Info & Selectors */}
          <div className="order-2 space-y-6">
            <HijabProductInfo />

            <div className="space-y-6">
              {/* Bundle Selector */}
              <HijabBundleSelector
                selectedBundle={state.selectedBundle}
                onSelect={selectBundle}
              />

              {/* Color Selector */}
              <HijabColorSelector
                selectedColor={state.selectedColor}
                onSelect={selectColor}
                error={errors.color}
              />

              {/* Size Selector */}
              <HijabSizeSelector
                selectedSize={state.selectedSize}
                onSelect={selectSize}
                error={errors.size}
              />
            </div>
          </div>
        </section>

        {/* Order Section */}
        <section
          ref={formRef}
          id="order-section"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-20"
        >
          {/* Order Form - 2 Columns */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            {/* Error Message */}
            {submitError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <p className="font-bold mb-1">⚠ خطأ في الإرسال</p>
                <p>{submitError}</p>
              </div>
            )}

            <HijabOrderForm
              fullName={state.fullName}
              phone={state.phone}
              wilayaId={state.wilayaId}
              commune={state.commune}
              address={state.address}
              deliveryType={state.deliveryType}
              onFullNameChange={setFullName}
              onPhoneChange={setPhone}
              onWilayaChange={selectWilaya}
              onCommuneChange={setCommune}
              onAddressChange={setAddress}
              onDeliveryTypeChange={selectDeliveryType}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Order Summary - 1 Column (Sticky on Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <OrderSummary summary={orderSummary} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <HijabFooter />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar
        summary={orderSummary}
        onOrderClick={() => {}}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        summary={orderSummary}
        customerName={state.fullName}
      />
    </div>
  );
}

