import { create } from 'zustand'
import { Ticket, SearchFilters } from '@/types'

interface TicketState {
  tickets: Ticket[]
  filters: SearchFilters
  loading: boolean
  setTickets: (tickets: Ticket[]) => void
  setFilters: (filters: SearchFilters) => void
  setLoading: (loading: boolean) => void
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  filters: {},
  loading: false,
  setTickets: (tickets) => set({ tickets }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
}))
