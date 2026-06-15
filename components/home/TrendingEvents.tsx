import Link from "next/link";
import Image from "next/image";
import { getArtistImage } from "@/lib/images";

const events = [
  {
    id: "1",
    artist: "Bad Bunny",
    tour: "DeBÍ TiRAR MáS FOToS Tour",
    slug: "bad-bunny-milano-2025-07-10",
  },
  {
    id: "2",
    artist: "Tropico",
    tour: "Tour 2026",
    slug: "tropico-milano-2026-03-07",
  },
  {
    id: "3",
    artist: "Luca Carboni",
    tour: "Bio",
    slug: "luca-carboni-bologna-2026-04-04",
  },
  {
    id: "4",
    artist: "Fabrizio Moro",
    tour: "Non ho paura di niente Live 2026",
    slug: "fabrizio-moro-milano-2026-05-09",
  },
  {
    id: "5",
    artist: "Deep Purple",
    tour: "World Tour 2026",
    slug: "deep-purple-milano-2026-03-03",
  },
  {
    id: "6",
    artist: "Zucchero",
    tour: "Overdose D'Amore Gold",
    slug: "zucchero-milano-2026-03-14",
  },
  {
    id: "7",
    artist: "Geolier",
    tour: "2026 Stage",
    slug: "geolier-napoli-2026-06-07",
  },
  {
    id: "8",
    artist: "Luchè",
    tour: "Arena Tour 2025-2026",
    slug: "luche-milano-2025-12-06",
  },
  {
    id: "9",
    artist: "Caparezza",
    tour: "Live Tour 2026",
    slug: "caparezza-milano-2026-04-18",
  },
];

export default function TrendingEvents() {
  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/evento/${event.slug}`}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src={getArtistImage(event.artist)}
                alt={event.artist}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="font-black text-base leading-tight">
                  {event.artist}
                </h3>
                <p className="text-xs text-white/70 mt-0.5 line-clamp-1">
                  {event.tour}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
