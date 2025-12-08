/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Gallery Component
 * Image carousel with thumbnails and discount badge
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { HIJAB_PRODUCT } from "@/lib/config/hijab";

export function HijabGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const images = HIJAB_PRODUCT.images;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const openPreview = useCallback(() => {
    setIsPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setIsPreviewOpen(false);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg transform -rotate-3">
            -{HIJAB_PRODUCT.discountPercent}%
          </div>
        </div>

        {/* Zoom Button */}
        <button
          onClick={openPreview}
          className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all hover:scale-110 group"
          aria-label="عرض بالحجم الكامل"
        >
          <ZoomIn className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
        </button>

        {/* Main Image - Clickable */}
        <button
          onClick={openPreview}
          className="w-full h-full cursor-zoom-in"
        >
          <Image
            src={images[currentIndex]}
            alt={`${HIJAB_PRODUCT.titleAr} - صورة ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-300"
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors group"
          aria-label="الصورة السابقة"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors group"
          aria-label="الصورة التالية"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
        </button>

        {/* Image Counter (Mobile) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm md:hidden">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={cn(
              "relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-200",
              currentIndex === index
                ? "ring-3 ring-purple-500 ring-offset-2 scale-105"
                : "ring-1 ring-gray-200 hover:ring-purple-300 opacity-70 hover:opacity-100"
            )}
            aria-label={`اختيار الصورة ${index + 1}`}
          >
            <Image
              src={img}
              alt={`صورة مصغرة ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Touch hint for mobile */}
      <p className="text-center text-sm text-gray-400 md:hidden">
        اسحب للتصفح بين الصور
      </p>

      {/* Full-Screen Preview Modal */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closePreview}
        >
          {/* Close Button */}
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all group"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full">
            <span className="font-bold">{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{images.length}</span>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all group"
            aria-label="الصورة السابقة"
          >
            <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all group"
            aria-label="الصورة التالية"
          >
            <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Full-Size Image */}
          <div
            className="relative w-[90vw] h-[80vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${HIJAB_PRODUCT.titleAr} - صورة ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              quality={100}
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToIndex(index);
                }}
                className={cn(
                  "relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all flex-shrink-0",
                  currentIndex === index
                    ? "ring-2 ring-white scale-110"
                    : "ring-1 ring-white/30 opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`صورة مصغرة ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HijabGallery;
