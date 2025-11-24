"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cong } from "@/lib/config/cong";
import { formatPrice, scrollToElement } from "@/lib/utils";

export default function Hero() {
  const { hero, product } = cong;

  return (
    <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image - Left on large screens */}
          {hero.mainImage && (
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src={hero.mainImage}
                  alt={product.name}
                  fill
                  className="object-contain"
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          )}

          {/* Content - Right on large screens */}
          <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
            {hero.headline && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {hero.headline}
              </h1>
            )}

            <div className="text-4xl md:text-5xl font-bold">
              {formatPrice(product.price)}
            </div>

            {hero.subheadline && (
              <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed">
                {hero.subheadline}
              </p>
            )}

            {hero.ctaText && (
              <div>
                <Button
                  onClick={() => scrollToElement("order-form")}
                  size="lg"
                  className="bg-black hover:bg-black/80 text-white font-semibold text-lg px-12 py-6 w-full sm:w-auto"
                >
                  {hero.ctaText}
                </Button>
              </div>
            )}

            {hero.thumbnails && hero.thumbnails.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                {hero.thumbnails.map((src, i) => (
                  <div key={i} className="relative w-16 h-16 border border-[var(--color-border)] rounded overflow-hidden hover:border-black transition-colors cursor-pointer">
                    <Image
                      src={src}
                      alt={`صورة ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
