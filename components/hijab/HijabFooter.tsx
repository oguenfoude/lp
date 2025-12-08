/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Footer Component
 * Simple footer with policies and contact info
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { Heart, Instagram, Facebook, MessageCircle, Truck, RefreshCcw, Package } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/hijab";

export function HijabFooter() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("مرحباً، أرغب في الاستفسار عن حجاب الأميرة الفاخر");
    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <footer className="bg-gradient-to-br from-purple-900 to-pink-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Policies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <Truck className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-bold mb-1">التوصيل</h4>
            <p className="text-sm text-white/80">{SITE_CONFIG.policies.delivery}</p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <RefreshCcw className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-bold mb-1">سياسة الإرجاع</h4>
            <p className="text-sm text-white/80">{SITE_CONFIG.policies.return}</p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <Package className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-bold mb-1">الفحص عند الاستلام</h4>
            <p className="text-sm text-white/80">{SITE_CONFIG.policies.inspection}</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href={SITE_CONFIG.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <button
            onClick={handleWhatsApp}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/60 text-sm flex items-center justify-center gap-1">
            صُنع بـ <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> في الجزائر
          </p>
          <p className="text-white/40 text-xs mt-1">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-20 md:h-0" />
    </footer>
  );
}

export default HijabFooter;
