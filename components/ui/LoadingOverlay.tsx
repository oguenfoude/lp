"use client";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export function LoadingOverlay({ isLoading, message = "جاري الإرسال..." }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        
        {/* Message */}
        <p className="text-lg font-medium text-black">{message}</p>
      </div>
    </div>
  );
}
