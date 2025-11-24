"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { cong } from "@/lib/config/cong";

interface OrderContextValue {
  isLoading: boolean;
  showSuccess: (title?: string, message?: string) => void;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(undefined);
  const [successState, setSuccessState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  const showSuccess = (
    title = cong.form.success.title,
    message = cong.form.success.message
  ) => {
    setSuccessState({ isOpen: true, title, message });
  };

  const hideSuccess = () => {
    setSuccessState(prev => ({ ...prev, isOpen: false }));
  };

  const showLoading = (message?: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage(undefined);
  };

  return (
    <OrderContext.Provider value={{ isLoading, showSuccess, showLoading, hideLoading }}>
      {children}
      <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
      <SuccessModal
        isOpen={successState.isOpen}
        title={successState.title}
        message={successState.message}
        closeText={cong.form.success.closeButton}
        onClose={hideSuccess}
      />
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
}
