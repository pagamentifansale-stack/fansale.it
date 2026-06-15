import { useTicketStore } from './ticketStore'
import { supabase } from '@/lib/supabase'
import { Ticket } from '@/types'

export function useTickets() {
  const { tickets, filters, loading, setTickets, setFilters, setLoading } = useTicketStore()

  const fetchTickets = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('tickets')
      .select('*, seller:users(*), event:events(*)')
      .eq('status', 'available')
    if (!error && data) {
      setTickets(data as Ticket[])
    }
    setLoading(false)
  }

  return { tickets, filters, loading, fetchTickets, setFilters }
}
