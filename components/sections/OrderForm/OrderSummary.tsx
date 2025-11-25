import { formatPrice } from "@/lib/utils";
import { cong } from "@/lib/config/cong";

interface OrderSummaryProps {
  productSubtotal: number;
  deliveryPrice: number;
  totalPrice: number;
  quantity: number;
}

export default function OrderSummary({ productSubtotal, deliveryPrice, totalPrice }: Omit<OrderSummaryProps, 'quantity'>) {
  // Destructure & precompute to avoid repeated deep access / function calls
  const { summary } = cong.form;
  const formatOpts = { locale: 'ar-DZ', arabicDigits: true, withCurrency: true, symbol: 'dinar', symbolPosition: 'after' } as const;
  const formattedSubtotal = formatPrice(productSubtotal, formatOpts);
  const formattedDelivery = formatPrice(deliveryPrice, formatOpts);
  const formattedTotal = formatPrice(totalPrice, formatOpts);

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-3 border border-[var(--color-border)]" dir="rtl">
      <h3 className="font-bold text-lg mb-4">{summary.title}</h3>

      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-muted)]">{summary.productLabel}</span>
        <span className="font-medium">{formattedSubtotal}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-muted)]">{summary.deliveryLabel}</span>
        <span className="font-medium">{formattedDelivery}</span>
      </div>

      <div className="border-t border-gray-300 pt-3 mt-3">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">{summary.totalLabel}</span>
          <span className="font-bold text-xl">{formattedTotal}</span>
        </div>
      </div>
    </div>
  );
}
