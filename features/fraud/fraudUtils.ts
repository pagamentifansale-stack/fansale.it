import { Ticket } from '@/types'

export function isFraudulentListing(ticket: Ticket, averagePrice: number): boolean {
  if (ticket.price > averagePrice * 5) return true
  if (ticket.quantity > 8) return true
  return false
}

export function calculateFraudScore(ticket: Ticket, averagePrice: number): number {
  let score = 0
  if (ticket.price > averagePrice * 3) score += 30
  if (ticket.price > averagePrice * 5) score += 40
  if (ticket.quantity > 6) score += 20
  if (!ticket.proof_url) score += 10
  return Math.min(score, 100)
}
