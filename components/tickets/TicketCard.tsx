import { Ticket } from "@/types";
import PriceTag from "@/components/ui/PriceTag";
import Badge from "@/components/ui/Badge";

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
      <div className="flex justify-between items-start">
        <div>
          {ticket.section && (
            <p className="text-sm text-gray-400">Section {ticket.section}</p>
          )}
          {ticket.row && (
            <p className="text-sm text-gray-400">Row {ticket.row}</p>
          )}
          <p className="text-sm text-gray-400">Qty: {ticket.quantity}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <PriceTag price={ticket.price} />
          <Badge
            variant={ticket.status === "available" ? "success" : "warning"}
          >
            {ticket.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
