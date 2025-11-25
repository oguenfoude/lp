"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cong } from "@/lib/config/cong";
import { formatPrice, scrollToElement } from "@/lib/utils";
import { useState } from "react";
import { Shield, Sparkles, Wind, Zap, Target, Star } from "lucide-react";

export default function Hero() {
  const { hero, product, gallery } = cong;
  const [selectedImage, setSelectedImage] = useState(hero.mainImage);

  return (
    <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12">
          {/* Image - Left on large screens */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-square max-w-md mx-auto mb-4 bg-white rounded-2xl shadow-xl p-6">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain"
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            
            {/* Small thumbnail images */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedImage(hero.mainImage)}
                className={`relative w-16 h-16 border-2 rounded-xl overflow-hidden transition-all ${
                  selectedImage === hero.mainImage ? "border-black shadow-lg scale-105" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Image
                  src={hero.mainImage}
                  alt="صورة رئيسية"
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="64px"
                />
              </button>
              {gallery.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img.src)}
                  className={`relative w-16 h-16 border-2 rounded-xl overflow-hidden transition-all ${
                    selectedImage === img.src ? "border-black shadow-lg scale-105" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content - Right on large screens */}
          <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6">
            {hero.headline && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                {hero.headline}
              </h1>
            )}

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-full text-3xl md:text-4xl font-bold shadow-lg">
              <span>{formatPrice(product.price)}</span>
              <span className="text-lg opacity-90">فقط</span>
            </div>

            {hero.subheadline && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {hero.subheadline}
              </p>
            )}

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">الألوان المتوفرة:</h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors shadow-sm"
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                    <span className="text-sm font-medium text-gray-700">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">المقاسات المتوفرة:</h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {product.sizes.map((size) => (
                  <div
                    key={size.id}
                    className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg font-bold text-gray-900 hover:border-black hover:shadow-md transition-all cursor-default"
                  >
                    {size.label}
                  </div>
                ))}
              </div>
            </div>

            {hero.ctaText && (
              <div>
                <Button
                  onClick={() => scrollToElement("order-form")}
                  size="lg"
                  className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-semibold text-lg px-12 py-6 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all"
                >
                  {hero.ctaText}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Product Highlights Grid */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
            مميزات المنتج
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cong.productHighlights.map((highlight, index) => {
              const IconComponent = highlight.icon === 'shield' ? Shield :
                                    highlight.icon === 'sparkles' ? Sparkles :
                                    highlight.icon === 'wind' ? Wind :
                                    highlight.icon === 'zap' ? Zap :
                                    highlight.icon === 'target' ? Target : Star;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-black to-gray-700 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-900">{highlight.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
