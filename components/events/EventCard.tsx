import { Event } from "@/types";
import Link from "next/link";
import { formatEventDate } from "@/utils/formatDate";
import { MOCK_ARTISTS, MOCK_EVENT_TICKETS } from "@/lib/mockTickets";

// Build a lookup: artist name → { artistSlug, artistId }
const ARTIST_NAME_TO_IDS: Record<
  string,
  { artistSlug: string; artistId: number }
> = {};
for (const [slug, artist] of Object.entries(MOCK_ARTISTS)) {
  ARTIST_NAME_TO_IDS[artist.name.toLowerCase()] = {
    artistSlug: slug,
    artistId: artist.id,
  };
}

export default function EventCard({ event }: { event: Event }) {
  // Try to find a matching mock event to get the numeric eventId
  const artistKey = event.artist.toLowerCase();
  const artistIds = ARTIST_NAME_TO_IDS[artistKey];

  // Find matching mock event by artist + date
  const mockEvent = Object.values(MOCK_EVENT_TICKETS).find(
    (e) =>
      e.artist.toLowerCase() === artistKey &&
      e.date === new Date(event.event_date).toLocaleDateString("it-IT"),
  );

  const href =
    artistIds && mockEvent
      ? `/tickets/all/${artistIds.artistSlug}/${artistIds.artistId}/${mockEvent.numericId}`
      : artistIds
        ? `/tickets/all/${artistIds.artistSlug}/${artistIds.artistId}`
        : `/tickets/all`;

  return (
    <Link
      href={href}
      className="block rounded-xl border border-gray-800 bg-gray-900 p-4 hover:border-brand-500 transition-colors"
    >
      <h3 className="font-semibold">{event.artist}</h3>
      <p className="text-sm text-gray-400">
        {event.venue}, {event.city}
      </p>
      <p className="text-sm text-gray-500">
        {formatEventDate(event.event_date)}
      </p>
    </Link>
  );
}
