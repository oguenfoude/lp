/**
 * ═══════════════════════════════════════════════════════════════
 * حجاب الأميرة - Success Modal
 * Order confirmation modal
 * ═══════════════════════════════════════════════════════════════
 */

"use client";

import { useEffect } from "react";
import { CheckCircle, X, MessageCircle, Package, Phone, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG, formatPrice } from "@/lib/config/hijab";
import type { OrderSummary } from "@/lib/types/hijab";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: OrderSummary;
  customerName?: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  summary,
  customerName,
}: SuccessModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `مرحباً، أنا ${customerName || "زبون/ة"}.\nأود تأكيد طلبي:\n- ${summary.productName}\n- الكمية: ${summary.quantity}\n- اللون: ${summary.color}\n- المقاس: ${summary.size}\n- الإجمالي: ${formatPrice(summary.total)}`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto",
          "animate-in fade-in zoom-in duration-300"
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            تم استلام طلبك بنجاح! 🎉
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6">
            شكراً لك {customerName && <span className="font-medium text-purple-600">{customerName}</span>}!
            <br />
            سنتصل بك قريباً لتأكيد الطلب.
          </p>

          {/* Order Summary */}
          <div className="bg-purple-50 rounded-xl p-4 mb-6 text-right">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 justify-end">
              <Package className="w-5 h-5 text-purple-600" />
              ملخص طلبك
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">المنتج</span>
                <span className="font-medium">{summary.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الكمية</span>
                <span className="font-medium">{summary.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">اللون</span>
                <span className="font-medium">{summary.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المقاس</span>
                <span className="font-medium">{summary.size}</span>
              </div>
              <div className="border-t border-purple-200 my-2 pt-2 flex justify-between">
                <span className="font-bold text-purple-600">الإجمالي</span>
                <span className="font-bold text-purple-600">{formatPrice(summary.total)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              تواصلي معنا على واتساب
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl border-2 border-purple-200 text-purple-600 font-medium hover:bg-purple-50 transition-colors"
            >
              إغلاق
            </button>
          </div>

          {/* Delivery Note */}
          <div className="text-xs text-gray-400 mt-4 space-y-1">
            <p className="flex items-center justify-center gap-1">
              <Phone className="w-3 h-3" />
              سنتصل بك خلال ساعات العمل
            </p>
            <p className="flex items-center justify-center gap-1">
              <Truck className="w-3 h-3" />
              التوصيل خلال 24-72 ساعة حسب ولايتك
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
