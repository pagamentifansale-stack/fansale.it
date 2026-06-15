import { NextRequest, NextResponse } from 'next/server'

const LOCK_DURATION_MS = 5 * 60 * 1000 // 5 minutes

// In-memory lock store — replace with Supabase in production
const locks = new Map<string, { buyerEmail: string; expiresAt: number }>()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ticketId, buyerEmail } = body

    if (!ticketId || !buyerEmail) {
      return NextResponse.json({ error: 'ticketId and buyerEmail are required' }, { status: 400 })
    }

    const existing = locks.get(ticketId)
    const now = Date.now()

    // Check if already locked by someone else
    if (existing && existing.expiresAt > now && existing.buyerEmail !== buyerEmail) {
      const remainingMs = existing.expiresAt - now
      const remainingMinutes = Math.floor(remainingMs / 60000)
      const remainingSeconds = Math.floor((remainingMs % 60000) / 1000)
      return NextResponse.json({
        locked: true,
        lockedBy: 'another_user',
        expiresAt: new Date(existing.expiresAt).toISOString(),
        remainingTime: `${remainingMinutes}:${String(remainingSeconds).padStart(2, '0')}`,
        message: 'Das Angebot ist zeitweise für einen anderen Benutzer reserviert.',
      }, { status: 409 })
    }

    // Lock the ticket
    const expiresAt = now + LOCK_DURATION_MS
    locks.set(ticketId, { buyerEmail, expiresAt })

    // TODO: Also update ticket status to 'locked' in Supabase:
    // await supabase.from('tickets').update({ status: 'locked', locked_until: new Date(expiresAt).toISOString() }).eq('id', ticketId)

    return NextResponse.json({
      locked: false,
      success: true,
      expiresAt: new Date(expiresAt).toISOString(),
      lockDurationMinutes: 5,
    })
  } catch (err) {
    console.error('[lock-ticket]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const ticketId = searchParams.get('ticketId')
    if (!ticketId) return NextResponse.json({ error: 'ticketId required' }, { status: 400 })
    locks.delete(ticketId)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
