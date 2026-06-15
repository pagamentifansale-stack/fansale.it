import { NextRequest, NextResponse } from 'next/server'

// Webhook endpoint — Stripe integration removed.
// Payments are handled manually via PayPal, IBAN, Crypto, and Gift Card flows.
export async function POST(_req: NextRequest) {
  return NextResponse.json({ received: true })
}
