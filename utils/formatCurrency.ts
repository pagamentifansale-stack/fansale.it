export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function calculateServiceFee(price: number): number {
  return Math.round(price * 0.02 * 100) / 100
}

export function calculateTotal(price: number, quantity: number): {
  subtotal: number
  serviceFee: number
  processingFee: number
  total: number
} {
  const subtotal = price * quantity
  const serviceFee = calculateServiceFee(subtotal)
  const processingFee = 0.99
  const total = subtotal + serviceFee + processingFee
  return { subtotal, serviceFee, processingFee, total }
}
