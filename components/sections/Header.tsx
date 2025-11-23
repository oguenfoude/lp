"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site-config";
import { siteData } from "@/lib/data/site-data";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src={process.env.NEXT_PUBLIC_LOGO_IMAGE || "https://placehold.co/120x120?text=Logo&font=source-sans-pro"}
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xl md:text-2xl font-bold text-[var(--color-dark)]">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleOrderClick}
            size="lg"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold transition-colors"
          >
            {siteData.headerCta}
          </Button>
        </div>
      </div>
    </header>
  );
}
