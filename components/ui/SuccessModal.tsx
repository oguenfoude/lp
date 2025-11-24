"use client";

import { useEffect } from "react";
import { Button } from "./button";

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  closeText: string;
  onClose: () => void;
}

export function SuccessModal({ isOpen, title, message, closeText, onClose }: SuccessModalProps) {
  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Body scroll lock when open
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

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h2 id="success-modal-title" className="text-2xl font-bold text-center mb-3">
          {title}
        </h2>

        {/* Message */}
        <p className="text-[var(--color-muted)] text-center leading-relaxed mb-6">
          {message}
        </p>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="w-full bg-black hover:bg-black/80 text-white font-semibold py-6 text-lg"
          autoFocus
        >
          {closeText}
        </Button>
      </div>
    </div>
  );
}
