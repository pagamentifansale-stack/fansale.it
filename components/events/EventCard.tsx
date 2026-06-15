import { Event } from "@/types"
import Link from "next/link"
import { formatEventDate } from "@/utils/formatDate"
import { generateSlug } from "@/utils/generateSlug"

export default function EventCard({ event }: { event: Event }) {
  const slug = generateSlug(event.artist, event.city, event.event_date)
  return (
    <Link href={`/event/${slug}`} className="block rounded-xl border border-gray-800 bg-gray-900 p-4 hover:border-brand-500 transition-colors">
      <h3 className="font-semibold">{event.artist}</h3>
      <p className="text-sm text-gray-400">{event.venue}, {event.city}</p>
      <p className="text-sm text-gray-500">{formatEventDate(event.event_date)}</p>
    </Link>
  )
}