import { Ticket } from "@/types";
import Link from "next/link";
import PriceTag from "@/components/ui/PriceTag";

export default function TicketListingCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link
      href={`/biglietto/${ticket.id}`}
      className="block rounded-xl border border-gray-800 bg-gray-900 p-4 hover:border-brand-500 transition-colors"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Ticket #{ticket.id.slice(0, 8)}</p>
          <p className="text-sm text-gray-400">Qty: {ticket.quantity}</p>
        </div>
        <PriceTag price={ticket.price} />
      </div>
    </Link>
  );
}
