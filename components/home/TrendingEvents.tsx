import Link from "next/link";
import Image from "next/image";
import { getArtistImage } from "@/lib/images";

const events = [
  {
    id: "1",
    artist: "Bad Bunny",
    tour: "DeBÍ TiRAR MáS FOToS Tour",
    href: "/tickets/all/bad-bunny/456789/20400100",
  },
  {
    id: "2",
    artist: "Tropico",
    tour: "Tour 2026",
    href: "/cerca?q=Tropico",
  },
  {
    id: "3",
    artist: "Luca Carboni",
    tour: "Bio",
    href: "/cerca?q=Luca+Carboni",
  },
  {
    id: "4",
    artist: "Fabrizio Moro",
    tour: "Non ho paura di niente Live 2026",
    href: "/cerca?q=Fabrizio+Moro",
  },
  {
    id: "5",
    artist: "Deep Purple",
    tour: "World Tour 2026",
    href: "/cerca?q=Deep+Purple",
  },
  {
    id: "6",
    artist: "Zucchero",
    tour: "Overdose D'Amore Gold",
    href: "/cerca?q=Zucchero",
  },
  {
    id: "7",
    artist: "Geolier",
    tour: "Stadi 2026",
    href: "/tickets/all/geolier/577164",
  },
  {
    id: "8",
    artist: "Luchè",
    tour: "Arena Tour 2025-2026",
    href: "/cerca?q=Luch%C3%A8",
  },
  {
    id: "9",
    artist: "Caparezza",
    tour: "Live Tour 2026",
    href: "/cerca?q=Caparezza",
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
              href={event.href}
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
