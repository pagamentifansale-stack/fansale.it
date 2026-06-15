import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Real Italian concert events — used as fallback when Supabase is not yet configured
const REAL_EVENTS = [
  { id: '1', artist: 'Vasco Rossi', title: 'Vasco Live 2026', venue: 'Stadio Olimpico', city: 'Roma', event_date: '2026-06-06T21:00:00+02:00', slug: 'vasco-rossi-roma-2026-06-06', min_price: 89.50, ticket_count: 18 },
  { id: '2', artist: 'Vasco Rossi', title: 'Vasco Live 2026', venue: 'Stadio San Siro', city: 'Milano', event_date: '2026-06-13T21:00:00+02:00', slug: 'vasco-rossi-milano-2026-06-13', min_price: 94.00, ticket_count: 12 },
  { id: '3', artist: 'Vasco Rossi', title: 'Vasco Live 2026', venue: 'Stadio Maradona', city: 'Napoli', event_date: '2026-06-20T21:00:00+02:00', slug: 'vasco-rossi-napoli-2026-06-20', min_price: 79.00, ticket_count: 7 },
  { id: '4', artist: 'Ultimo', title: 'La Favola per Sempre', venue: 'Stadio Olimpico', city: 'Roma', event_date: '2026-07-04T21:00:00+02:00', slug: 'ultimo-roma-2026-07-04', min_price: 90.16, ticket_count: 14 },
  { id: '5', artist: 'Ultimo', title: 'La Favola per Sempre', venue: 'Stadio San Siro', city: 'Milano', event_date: '2026-07-11T21:00:00+02:00', slug: 'ultimo-milano-2026-07-11', min_price: 95.00, ticket_count: 9 },
  { id: '6', artist: 'Annalisa', title: 'Tutti nel Vortice Indoor Tour 2025', venue: 'Unipol Arena', city: 'Bologna', event_date: '2025-11-14T21:00:00+01:00', slug: 'annalisa-bologna-2025-11-14', min_price: 45.00, ticket_count: 5 },
  { id: '7', artist: 'Annalisa', title: 'Tutti nel Vortice Indoor Tour 2025', venue: 'Mediolanum Forum', city: 'Milano', event_date: '2025-11-22T21:00:00+01:00', slug: 'annalisa-milano-2025-11-22', min_price: 48.50, ticket_count: 11 },
  { id: '8', artist: 'Annalisa', title: 'Tutti nel Vortice Indoor Tour 2025', venue: 'Palazzo dello Sport', city: 'Roma', event_date: '2025-11-29T21:00:00+01:00', slug: 'annalisa-roma-2025-11-29', min_price: 46.00, ticket_count: 3 },
  { id: '9', artist: 'Elodie', title: 'Elodie Live 2025', venue: 'Mediolanum Forum', city: 'Milano', event_date: '2025-10-18T21:00:00+02:00', slug: 'elodie-milano-2025-10-18', min_price: 52.00, ticket_count: 6 },
  { id: '10', artist: 'Elodie', title: 'Elodie Live 2025', venue: 'Palazzo dello Sport', city: 'Roma', event_date: '2025-10-25T21:00:00+02:00', slug: 'elodie-roma-2025-10-25', min_price: 49.00, ticket_count: 4 },
  { id: '11', artist: 'Geolier', title: 'Geolier 2026 Stage', venue: 'Stadio Maradona', city: 'Napoli', event_date: '2026-06-07T21:00:00+02:00', slug: 'geolier-napoli-2026-06-07', min_price: 65.00, ticket_count: 20 },
  { id: '12', artist: 'Geolier', title: 'Geolier 2026 Stage', venue: 'Stadio San Siro', city: 'Milano', event_date: '2026-06-14T21:00:00+02:00', slug: 'geolier-milano-2026-06-14', min_price: 68.00, ticket_count: 15 },
  { id: '13', artist: 'Luchè', title: 'Arena Tour 2025-2026', venue: 'Mediolanum Forum', city: 'Milano', event_date: '2025-12-06T21:00:00+01:00', slug: 'luche-milano-2025-12-06', min_price: 55.00, ticket_count: 8 },
  { id: '14', artist: 'Luchè', title: 'Arena Tour 2025-2026', venue: 'Palazzo dello Sport', city: 'Roma', event_date: '2025-12-13T21:00:00+01:00', slug: 'luche-roma-2025-12-13', min_price: 52.00, ticket_count: 6 },
  { id: '15', artist: 'Caparezza', title: 'Exuvia Live Tour 2026', venue: 'Mediolanum Forum', city: 'Milano', event_date: '2026-04-18T21:00:00+02:00', slug: 'caparezza-milano-2026-04-18', min_price: 42.00, ticket_count: 10 },
  { id: '16', artist: 'Zucchero', title: "Overdose D'Amore Gold", venue: 'Mediolanum Forum', city: 'Milano', event_date: '2026-03-14T21:00:00+01:00', slug: 'zucchero-milano-2026-03-14', min_price: 75.00, ticket_count: 7 },
  { id: '17', artist: 'Fabrizio Moro', title: 'Non ho paura di niente Live 2026', venue: 'Mediolanum Forum', city: 'Milano', event_date: '2026-05-09T21:00:00+02:00', slug: 'fabrizio-moro-milano-2026-05-09', min_price: 38.00, ticket_count: 5 },
  { id: '18', artist: 'Luca Carboni', title: 'Bio Tour 2026', venue: 'Unipol Arena', city: 'Bologna', event_date: '2026-04-04T21:00:00+02:00', slug: 'luca-carboni-bologna-2026-04-04', min_price: 35.00, ticket_count: 4 },
  { id: '19', artist: 'Cesare Cremonini', title: 'Cremonini Stadi 2026', venue: 'Stadio Olimpico', city: 'Roma', event_date: '2026-07-01T21:00:00+02:00', slug: 'cremonini-roma-2026-07-01', min_price: 82.00, ticket_count: 16 },
  { id: '20', artist: 'Cesare Cremonini', title: 'Cremonini Stadi 2026', venue: 'Stadio San Siro', city: 'Milano', event_date: '2026-07-08T21:00:00+02:00', slug: 'cremonini-milano-2026-07-08', min_price: 85.00, ticket_count: 13 },
  { id: '21', artist: 'Negramaro', title: 'Negramaro Live 2026', venue: 'Stadio Olimpico', city: 'Roma', event_date: '2026-06-19T21:00:00+02:00', slug: 'negramaro-roma-2026-06-19', min_price: 58.00, ticket_count: 9 },
  { id: '22', artist: 'Max Pezzali', title: 'Max Forever 2026', venue: 'Stadio San Siro', city: 'Milano', event_date: '2026-06-05T21:00:00+02:00', slug: 'max-pezzali-milano-2026-06-05', min_price: 72.00, ticket_count: 11 },
  { id: '23', artist: 'Elisa', title: 'Elisa Live 2026', venue: 'Mediolanum Forum', city: 'Milano', event_date: '2026-02-21T21:00:00+01:00', slug: 'elisa-milano-2026-02-21', min_price: 44.00, ticket_count: 6 },
  { id: '24', artist: 'Claudio Baglioni', title: 'aTUTTOCUORE 2026', venue: 'Palazzo dello Sport', city: 'Roma', event_date: '2026-01-17T21:00:00+01:00', slug: 'baglioni-roma-2026-01-17', min_price: 68.00, ticket_count: 8 },
  { id: '25', artist: 'Deep Purple', title: 'Turning to Crime World Tour 2026', venue: 'Mediolanum Forum', city: 'Milano', event_date: '2026-03-03T21:00:00+01:00', slug: 'deep-purple-milano-2026-03-03', min_price: 88.00, ticket_count: 5 },
  { id: '26', artist: 'Ghemon', title: "La prima volta, l'ultima volta, l'unica volta", venue: 'Fabrique', city: 'Milano', event_date: '2026-11-29T21:00:00+01:00', slug: 'ghemon-milano-2026-11-29', min_price: 33.60, ticket_count: 3 },
  { id: '27', artist: 'Tropico', title: 'Tour 2026', venue: 'Mediolanum Forum', city: 'Milano', event_date: '2026-03-07T21:00:00+01:00', slug: 'tropico-milano-2026-03-07', min_price: 40.00, ticket_count: 7 },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() || ''
  const city = searchParams.get('city')?.toLowerCase() || ''
  const priceMin = parseFloat(searchParams.get('priceMin') || '0')
  const priceMax = parseFloat(searchParams.get('priceMax') || '99999')

  // Try Supabase first
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your_supabase')) {
    try {
      const cookieStore = await cookies()
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      })

      let query = supabase
        .from('events')
        .select(`
          id, artist, title, venue, city, event_date, slug,
          tickets(price, status)
        `)
        .order('event_date', { ascending: true })

      if (q) query = query.or(`artist.ilike.%${q}%,title.ilike.%${q}%,city.ilike.%${q}%,venue.ilike.%${q}%`)
      if (city) query = query.ilike('city', `%${city}%`)

      const { data, error } = await query

      if (!error && data) {
        const results = data.map((event: any) => {
          const availableTickets = event.tickets?.filter((t: any) => t.status === 'available') || []
          const minPrice = availableTickets.length > 0
            ? Math.min(...availableTickets.map((t: any) => t.price))
            : null
          return {
            ...event,
            tickets: undefined,
            min_price: minPrice,
            ticket_count: availableTickets.length,
          }
        }).filter((e: any) => {
          if (priceMin > 0 && e.min_price && e.min_price < priceMin) return false
          if (priceMax < 99999 && e.min_price && e.min_price > priceMax) return false
          return true
        })

        return NextResponse.json({ events: results, source: 'supabase' })
      }
    } catch (err) {
      console.error('[events API] Supabase error, falling back to seed data:', err)
    }
  }

  // Fallback: filter the real seed data
  let results = REAL_EVENTS.filter(e => {
    if (q && !e.artist.toLowerCase().includes(q) && !e.title.toLowerCase().includes(q) && !e.city.toLowerCase().includes(q) && !e.venue.toLowerCase().includes(q)) return false
    if (city && !e.city.toLowerCase().includes(city)) return false
    if (priceMin > 0 && e.min_price < priceMin) return false
    if (priceMax < 99999 && e.min_price > priceMax) return false
    return true
  })

  return NextResponse.json({ events: results, source: 'seed' })
}
