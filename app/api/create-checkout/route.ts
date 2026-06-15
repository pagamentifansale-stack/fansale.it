import { NextRequest, NextResponse } from 'next/server'
import { calculateTotal } from '@/utils/formatCurrency'

/**
 * Hardcoded mock checkout endpoint.
 * Returns a fake orderId and amount — no Stripe or Supabase calls.
 * Replace with real Stripe PaymentIntent creation when keys are configured.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ticketId, quantity = 1, buyerEmail } = body

    if (!ticketId || !buyerEmail) {
      return NextResponse.json(
        { error: 'ticketId and buyerEmail are required' },
        { status: 400 }
      )
    }

    // Simulate a small processing delay
    await new Promise((r) => setTimeout(r, 300))

    // Use a fixed price of €0 for the mock — the real price is shown in the UI
    // In production this would fetch the ticket price from Supabase
    const qty = Math.max(1, Number(quantity))
    const mockPrice = 65.0 // placeholder; real price comes from Supabase
    const { subtotal, serviceFee, processingFee, total } = calculateTotal(mockPrice, qty)

    const orderId = `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    return NextResponse.json({
      success: true,
      orderId,
      amount: Math.round(total * 100), // in cents
      currency: 'eur',
      breakdown: { subtotal, serviceFee, processingFee, total },
    })
  } catch (err) {
    console.error('[create-checkout]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
