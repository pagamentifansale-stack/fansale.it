import { Ticket } from "@/types"
import TicketListingCard from "@/components/tickets/TicketListingCard"

export default function EventListings({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Available Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-400">No tickets available for this event.</p>
      ) : (
        tickets.map(ticket => <TicketListingCard key={ticket.id} ticket={ticket} />)
      )}
    </div>
  )
}