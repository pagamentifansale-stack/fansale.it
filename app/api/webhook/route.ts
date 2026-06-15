import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// Stripe requires the raw body for signature verification — disable body parsing
export const config = { api: { bodyParser: false } }

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  // 1. Verify Stripe signature
  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()

  try {
    switch (event.type) {
      // ----------------------------------------------------------------
      // Payment succeeded → mark order paid, ticket sold, create payout
      // ----------------------------------------------------------------
      case 'payment_intent.succeeded': {
        const pi = event.data.object
        console.log('[webhook] payment_intent.succeeded:', pi.id)

        // Find order by payment_intent_id
        const { data: order, error: orderFetchError } = await supabase
          .from('orders')
          .select('id, ticket_id, total, buyer_email')
          .eq('payment_intent_id', pi.id)
          .single()

        if (orderFetchError || !order) {
          console.error('[webhook] Order not found for PI:', pi.id, orderFetchError)
          break
        }

        // Update order → paid
        const { error: orderUpdateError } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            payment_method: pi.payment_method_types?.[0] ?? null,
          })
          .eq('id', order.id)

        if (orderUpdateError) {
          console.error('[webhook] Failed to update order status:', orderUpdateError)
        }

        // Update ticket → sold
        const { error: ticketUpdateError } = await supabase
          .from('tickets')
          .update({ status: 'sold' })
          .eq('id', order.ticket_id)

        if (ticketUpdateError) {
          console.error('[webhook] Failed to update ticket status:', ticketUpdateError)
        }

        // Fetch ticket to get seller info + price for payout
        const { data: ticket } = await supabase
          .from('tickets')
          .select('seller_id, seller:profiles(iban)')
          .eq('id', order.ticket_id)
          .single()

        if (ticket) {
          // Seller receives total minus 7% service fee
          const sellerAmount = Math.round(order.total * 0.93 * 100) / 100
          const iban = (ticket.seller as { iban?: string } | null)?.iban ?? 'PENDING'

          const { error: payoutError } = await supabase
            .from('payouts')
            .insert({
              seller_id: ticket.seller_id,
              order_id: order.id,
              amount: sellerAmount,
              iban,
              status: 'pending',
            })

          if (payoutError) {
            console.error('[webhook] Failed to create payout record:', payoutError)
          }
        }

        break
      }

      // ----------------------------------------------------------------
      // Payment failed → mark order failed, release ticket lock
      // ----------------------------------------------------------------
      case 'payment_intent.payment_failed': {
        const pi = event.data.object
        console.log('[webhook] payment_intent.payment_failed:', pi.id)

        const { data: order } = await supabase
          .from('orders')
          .select('id, ticket_id')
          .eq('payment_intent_id', pi.id)
          .single()

        if (order) {
          await supabase
            .from('orders')
            .update({ status: 'failed' })
            .eq('id', order.id)

          // Release ticket lock → back to available
          await supabase
            .from('tickets')
            .update({ status: 'available', locked_until: null, locked_by_email: null })
            .eq('id', order.ticket_id)
            .eq('status', 'locked') // only if still locked, not already sold
        }

        break
      }

      // ----------------------------------------------------------------
      // Refund issued → mark order refunded, restore ticket to available
      // ----------------------------------------------------------------
      case 'charge.refunded': {
        const charge = event.data.object
        console.log('[webhook] charge.refunded:', charge.id)

        const piId = typeof charge.payment_intent === 'string'
          ? charge.payment_intent
          : charge.payment_intent?.id

        if (piId) {
          const { data: order } = await supabase
            .from('orders')
            .select('id, ticket_id')
            .eq('payment_intent_id', piId)
            .single()

          if (order) {
            await supabase
              .from('orders')
              .update({ status: 'refunded' })
              .eq('id', order.id)

            // Restore ticket to available so it can be re-listed
            await supabase
              .from('tickets')
              .update({ status: 'available', locked_until: null, locked_by_email: null })
              .eq('id', order.ticket_id)
          }
        }

        break
      }

      // ----------------------------------------------------------------
      // PaymentIntent cancelled → release lock
      // ----------------------------------------------------------------
      case 'payment_intent.canceled': {
        const pi = event.data.object
        console.log('[webhook] payment_intent.canceled:', pi.id)

        const { data: order } = await supabase
          .from('orders')
          .select('id, ticket_id')
          .eq('payment_intent_id', pi.id)
          .single()

        if (order) {
          await supabase
            .from('orders')
            .update({ status: 'failed' })
            .eq('id', order.id)

          await supabase
            .from('tickets')
            .update({ status: 'available', locked_until: null, locked_by_email: null })
            .eq('id', order.ticket_id)
            .eq('status', 'locked')
        }

        break
      }

      default:
        console.log('[webhook] Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[webhook] Handler error:', err)
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 })
  }
}
