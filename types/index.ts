export interface User {
  id: string
  username: string
  avatar_url?: string
  rating: number
  verified: boolean
  successful_sales: number
  created_at: string
}

export interface Event {
  id: string
  artist: string
  title: string
  venue: string
  city: string
  event_date: string
  image_url?: string
  created_at: string
}

export interface Ticket {
  id: string
  seller_id: string
  event_id: string
  section?: string
  row?: string
  seat?: string
  quantity: number
  price: number
  proof_url?: string
  is_nominative: boolean  // true = each ticket needs a name, false = no name needed
  status: 'available' | 'locked' | 'sold' | 'flagged'
  created_at: string
  seller?: User
  event?: Event
}

export interface AttendeeInfo {
  ticketIndex: number   // 0-based index (ticket 1, ticket 2, etc.)
  firstName: string
  lastName: string
}

export interface Order {
  id: string
  buyer_id: string
  ticket_id: string
  total: number
  payment_intent?: string
  status: 'pending' | 'paid' | 'delivered' | 'completed' | 'refunded' | 'disputed'
  created_at: string
  ticket?: Ticket
  buyer?: User
  attendees?: AttendeeInfo[]  // populated for nominative tickets
}

export interface Review {
  id: string
  reviewer_id: string
  seller_id: string
  rating: number
  comment?: string
  created_at: string
}

export interface CheckoutSession {
  id: string
  ticket_id: string
  buyer_id: string
  expires_at: string
  status: 'active' | 'expired' | 'completed'
  created_at: string
}

export interface Payout {
  id: string
  seller_id: string
  order_id: string
  amount: number
  status: 'pending' | 'processing' | 'paid' | 'failed'
  created_at: string
}

export type TicketStatus = Ticket['status']
export type OrderStatus = Order['status']
export type PayoutStatus = Payout['status']

export interface SearchFilters {
  query?: string
  city?: string
  dateFrom?: string
  dateTo?: string
  priceMin?: number
  priceMax?: number
  section?: string
}

export interface CheckoutStep {
  id: string
  label: string
  completed: boolean
  active: boolean
}
