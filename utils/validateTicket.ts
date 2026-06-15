export function validateTicketPrice(price: number): boolean {
  return price > 0 && price <= 10000
}

export function validateTicketQuantity(quantity: number): boolean {
  return quantity >= 1 && quantity <= 10
}

export function isSuspiciousPrice(price: number, averagePrice: number): boolean {
  return price > averagePrice * 3 || price < averagePrice * 0.2
}
