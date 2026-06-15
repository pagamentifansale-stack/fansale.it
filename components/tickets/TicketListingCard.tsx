import { Ticket } from "@/types";
import Link from "next/link";
import PriceTag from "@/components/ui/PriceTag";
import { MOCK_ARTISTS, MOCK_EVENT_TICKETS } from "@/lib/mockTickets";

// Build artist name → ids lookup
const ARTIST_NAME_TO_IDS: Record<
  string,
  { artistSlug: string; artistId: number }
> = {};
for (const [slug, artist] of Object.entries(MOCK_ARTISTS)) {
  ARTIST_NAME_TO_IDS[artist.name.toLowerCase()] = {
    artistSlug: slug,
    artistId: artist.id,
  };
}

export default function TicketListingCard({ ticket }: { ticket: Ticket }) {
  // Try to find the mock ticket by id to get numeric offerId + event info
  let href = `/cerca`;
  for (const event of Object.values(MOCK_EVENT_TICKETS)) {
    const mockTicket = event.tickets[ticket.id];
    if (mockTicket) {
      href = `/tickets/all/${event.artistSlug}/${event.artistId}/${event.numericId}?offerId=${mockTicket.offerId}&ptc=1`;
      break;
    }
  }

  return (
    <Link
      href={href}
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
