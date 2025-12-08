/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Header Component
 * Sticky header with logo and contact info
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { Phone, MessageCircle, Crown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/hijab";

export function HijabHeader() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("مرحباً، أرغب في الاستفسار عن حجاب الأميرة الفاخر");
    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+${SITE_CONFIG.whatsapp}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            <Crown className="w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-gray-800">{SITE_CONFIG.name}</h1>
            <p className="text-xs text-gray-400">أناقة بلا حدود</p>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="flex items-center gap-2">
          {/* Phone Button */}
          <button
            onClick={handleCall}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600 hidden sm:inline">
              {SITE_CONFIG.whatsappDisplay}
            </span>
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">واتساب</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default HijabHeader;
