import { Ticket } from "@/types";
import PriceTag from "@/components/ui/PriceTag";
import { AlertCircle } from "lucide-react";

export default function OrderSummary({ ticket }: { ticket: Ticket }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 space-y-3">
      <h3 className="font-semibold mb-2">Order Summary</h3>
      <PriceTag price={ticket.price} />

      {ticket.is_nominative && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <AlertCircle size={14} className="text-amber-400 shrink-0" />
          <p className="text-xs text-amber-300">
            Nominative tickets — attendee names required at checkout
          </p>
        </div>
      )}
    </div>
  );
}
