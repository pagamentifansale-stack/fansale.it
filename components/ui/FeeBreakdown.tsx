import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface FeeBreakdownProps {
  subtotal: number;
  serviceFee: number;
  processingFee: number;
  total: number;
  currency?: string;
  className?: string;
  quantity?: number;
  pricePerTicket?: number;
}

export default function FeeBreakdown({
  subtotal,
  serviceFee,
  processingFee,
  total,
  currency = "EUR",
  className,
  quantity,
  pricePerTicket,
}: FeeBreakdownProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Per-ticket breakdown if quantity > 1 */}
      {quantity && quantity > 1 && pricePerTicket && (
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            {formatCurrency(pricePerTicket, currency)} × {quantity} tickets
          </span>
          <span>{formatCurrency(subtotal, currency)}</span>
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-400">
        <span>Ticket price</span>
        <span>{formatCurrency(subtotal, currency)}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        <span className="flex items-center gap-1">
          Service fee
          <Info size={12} className="text-gray-600" />
        </span>
        <span>{formatCurrency(serviceFee, currency)}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        <span>Processing fee</span>
        <span>{formatCurrency(processingFee, currency)}</span>
      </div>

      <div className="h-px bg-gray-800" />

      <div className="flex justify-between font-semibold text-white">
        <span>Total</span>
        <span className="text-rose-400 text-lg">
          {formatCurrency(total, currency)}
        </span>
      </div>
    </div>
  );
}
