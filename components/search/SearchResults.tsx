import { Ticket } from "@/types"
import TicketListingCard from "@/components/tickets/TicketListingCard"
import Spinner from "@/components/ui/Spinner"

export default function SearchResults({ tickets, loading }: { tickets: Ticket[]; loading: boolean }) {
  if (loading) return <div className="flex justify-center py-8"><Spinner /></div>
  return (
    <div className="space-y-3">
      {tickets.map(ticket => <TicketListingCard key={ticket.id} ticket={ticket} />)}
    </div>
  )
}