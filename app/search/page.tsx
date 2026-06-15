"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  CheckCircle,
  Handshake,
  MapPin,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useDebounce } from "@/hooks/useDebounce";
import { getArtistImage } from "@/lib/images";

type EventResult = {
  id: string;
  artist: string;
  title: string;
  venue: string;
  city: string;
  event_date: string;
  slug: string;
  min_price: number | null;
  ticket_count: number;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [city, setCity] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [events, setEvents] = useState<EventResult[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedQuery) params.set("q", debouncedQuery);
      if (city) params.set("city", city);
      if (priceMin) params.set("priceMin", priceMin);
      if (priceMax) params.set("priceMax", priceMax);
      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, city, priceMin, priceMax]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const uniqueArtists = Array.from(new Set(events.map((e) => e.artist)));

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6">
      {/* Info banner */}
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 mb-4 text-xs sm:text-sm text-gray-600">
        fanSALE è un mercato secondario di rivendita di biglietti, dove il
        prezzo dei biglietti è sempre uguale al prezzo originale.
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#1a2744] focus-within:ring-1 focus-within:ring-[#1a2744]">
          <Search size={15} className="ml-3 text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per evento, artista, località..."
            className="flex-1 px-2 py-2.5 text-sm outline-none bg-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 border rounded-lg px-3 py-2 text-sm font-medium transition-colors ${showFilters ? "bg-[#1a2744] text-white border-[#1a2744]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
        >
          Filtri <SlidersHorizontal size={13} />
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Città
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="es. Milano"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a2744]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Prezzo min (€)
            </label>
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a2744]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Prezzo max (€)
            </label>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="500"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a2744]"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setCity("");
                setPriceMin("");
                setPriceMax("");
              }}
              className="w-full border border-gray-300 text-gray-600 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Reset filtri
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          {loading ? (
            <span className="text-gray-400">Ricerca in corso...</span>
          ) : (
            <>
              I migliori <strong>{events.length}</strong> risultati
              {query && (
                <>
                  {" "}
                  per &quot;<strong>{query}</strong>&quot;
                </>
              )}
            </>
          )}
        </p>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0 animate-pulse"
            >
              <div className="w-20 h-20 rounded-lg bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
              <div className="w-24 h-10 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      )}

      {/* Events section */}
      {!loading && events.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">Eventi</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 px-3 sm:px-5 py-3 hover:bg-gray-50 transition-colors"
              >
                {/* Artist image */}
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 relative bg-gray-200">
                  <Image
                    src={getArtistImage(event.artist)}
                    alt={event.artist}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/evento/${event.slug}`}
                    className="font-bold text-[#1a2744] hover:underline text-sm leading-tight block truncate"
                  >
                    {event.title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <Calendar size={10} /> {formatDate(event.event_date)}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                    <MapPin size={10} /> {event.venue}, {event.city}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {event.ticket_count}{" "}
                    {event.ticket_count === 1 ? "offerta" : "offerte"}{" "}
                    disponibili
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Da</p>
                    <p className="font-bold text-[#1a2744] text-sm">
                      {event.min_price
                        ? `€ ${event.min_price.toFixed(2).replace(".", ",")}`
                        : "N/D"}
                    </p>
                  </div>
                  <Link
                    href={`/evento/${event.slug}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Vedi
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Artists section */}
      {!loading && uniqueArtists.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl mb-5 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Artisti</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {uniqueArtists.slice(0, 5).map((artist) => {
              const artistEvents = events.filter((e) => e.artist === artist);
              const prices = artistEvents
                .map((e) => e.min_price)
                .filter(Boolean) as number[];
              const minPrice = prices.length > 0 ? Math.min(...prices) : null;
              return (
                <div
                  key={artist}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 relative bg-gray-200">
                      <Image
                        src={getArtistImage(artist)}
                        alt={artist}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {artist}
                      </p>
                      <p className="text-xs text-gray-400">
                        {artistEvents.length}{" "}
                        {artistEvents.length === 1 ? "evento" : "eventi"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {minPrice && (
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500">Da</p>
                        <p className="text-sm font-bold text-[#1a2744]">
                          EUR {minPrice.toFixed(2)}
                        </p>
                      </div>
                    )}
                    <Link
                      href={`/cerca?q=${encodeURIComponent(artist)}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      Vedi
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          {uniqueArtists.length > 5 && (
            <div className="px-5 py-3 border-t border-gray-100 text-center">
              <button className="bg-[#1a2744] hover:bg-[#243560] text-white font-semibold text-sm px-6 py-2 rounded-lg transition-colors">
                Mostra altri
              </button>
            </div>
          )}
        </div>
      )}

      {/* No results */}
      {!loading && events.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <Search size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">
            {query
              ? `Nessun risultato per "${query}"`
              : "Inizia a cercare un evento, artista o città"}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Prova con un artista diverso o una città
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Legenda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-green-400 bg-green-50 flex items-center justify-center shrink-0">
              <CheckCircle size={28} className="text-green-500" />
            </div>
            <div>
              <p className="font-black text-sm text-gray-900">TICKETCHECK!</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Biglietti verificati e garantiti con fanSALE TicketCheck
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-sky-400 bg-sky-50 flex items-center justify-center shrink-0">
              <Handshake size={28} className="text-sky-500" />
            </div>
            <div>
              <p className="font-black text-sm text-gray-900">PREZZO EQUO!</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Rivendi i biglietti nominativi all&apos;identico prezzo del
                biglietto originale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto" />
                <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto" />
              </div>
            </div>
          </main>
        }
      >
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
