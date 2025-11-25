"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cong } from "@/lib/config/cong";
import { scrollToElement } from "@/lib/utils";

// ====================
// Header Component
// الهيدر الثابت مع اللوجو وزر CTA
// ====================

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // تتبع السكرول لتغيير شكل الهيدر
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // دالة للانتقال إلى نموذج الطلب
  const handleOrderClick = () => {
    scrollToElement("order-form");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-white/98 backdrop-blur-md py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <Image
                  src="/images/logo/logo.png"
                  alt={cong.site.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold truncate text-gray-900">{cong.site.name}</span>
            </Link>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleOrderClick}
            size="lg"
            className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-semibold text-sm md:text-base whitespace-nowrap flex-shrink-0 shadow-lg hover:shadow-xl transition-all"
          >
            {cong.hero.ctaText}
          </Button>
        </div>
      </div>
    </header>
  );
}
