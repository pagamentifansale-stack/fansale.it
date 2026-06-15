import { Event } from "@/types"
import { formatEventDate } from "@/utils/formatDate"

export default function EventBanner({ event }: { event: Event }) {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gray-800">
      {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-full object-cover opacity-60" />}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h1 className="text-3xl font-bold text-white">{event.artist}</h1>
        <p className="text-gray-300">{event.venue} Â· {event.city}</p>
        <p className="text-gray-400 text-sm">{formatEventDate(event.event_date)}</p>
      </div>
    </div>
  )
}