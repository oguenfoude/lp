"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { siteData } from "@/lib/data/site-data";
import { scrollToElement } from "@/lib/utils";
import { Check } from "lucide-react";

// ====================
// Hero Section Component
// قسم البطل الرئيسي مع العنوان والصورة والمميزات
// ====================

export default function Hero() {
  const { hero } = siteData;

  // دالة للانتقال إلى نموذج الطلب
  const handleCTAClick = () => {
    scrollToElement("order-form");
  };

  return (
    <section className="relative pt-16 pb-8 md:pt-20 md:pb-12 bg-[var(--color-light)] overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            {hero.headline && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-dark)] mb-4 leading-tight">
                {hero.headline}
              </h1>
            )}
            {hero.subheadline && (
              <p className="text-lg md:text-xl text-[var(--color-peanut)] mb-6">
                {hero.subheadline}
              </p>
            )}

            {/* CTA Button */}
            {hero.ctaText && (
              <Button
                onClick={handleCTAClick}
                size="lg"
                className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold text-lg px-8 py-6 mb-6 transition-colors"
              >
                {hero.ctaText}
              </Button>
            )}

            {/* Trust Indicators */}
            {hero.trustIndicators.length > 0 && (
              <div className="space-y-2">
                {hero.trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-[var(--color-dark)]">
                    <Check className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
                    <span className="text-sm md:text-base">{indicator}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Image */}
          {hero.image && (
            <div className="relative w-full h-[360px] md:h-[480px] lg:h-[560px]">
              <Image
                src={hero.image}
                alt={hero.headline || ""}
                fill
                className="object-contain"
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>

      {/* Decorative Background Elements */}
      {/* Removed decorative colored blobs for neutral template */}
    </section>
  );
}
