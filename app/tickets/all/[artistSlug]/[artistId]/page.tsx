"use client";
import { Suspense, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  CheckCircle,
  Handshake,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getArtistImage } from "@/lib/images";
import {
  getArtistBySlug,
  getEventsByArtistId,
  MockEvent,
} from "@/lib/mockTickets";

// ─── Artist banner ────────────────────────────────────────────────────────────

function ArtistBanner({
  name,
  color,
  rating,
  ratingCount,
}: {
  name: string;
  color: string;
  rating: number;
  ratingCount: number;
}) {
  return (
    <div
      className={`relative bg-gradient-to-r ${color} rounded-none overflow-hidden`}
      style={{ minHeight: 160 }}
    >
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center gap-6">
        <div className="w-32 h-32 rounded border-2 border-white/30 overflow-hidden shrink-0 relative bg-black/30">
          <Image
            src={getArtistImage(name)}
            alt={name}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-black text-white mb-3">{name}</h1>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={18}
                className={
                  i <= Math.round(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-white/30"
                }
              />
            ))}
            <span className="text-white/80 text-sm ml-1">
              {rating} stelle, da {ratingCount.toLocaleString("it-IT")} Fan
              report su www.ticketone.it
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Event row ────────────────────────────────────────────────────────────────

function EventRow({
  event,
  artistSlug,
}: {
  event: MockEvent;
  artistSlug: string;
}) {
  const tickets = Object.values(event.tickets);
  const minPrice =
    tickets.length > 0 ? Math.min(...tickets.map((t) => t.price)) : null;
  const ticketCount = tickets.length;

  // Parse date for display (dd/mm/yyyy → day + month + year)
  const [dd, mm, yyyy] = event.date.split("/");
  const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
  const dayName = dateObj.toLocaleDateString("it-IT", { weekday: "long" });
  const day = dd.replace(/^0/, "");
  const monthShort = dateObj.toLocaleDateString("it-IT", { month: "short" });
  const yearShort = yyyy.slice(2);

  return (
    <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-3 hover:bg-gray-50 transition-colors">
      {/* Date */}
      <div className="text-center shrink-0 w-14 sm:w-20">
        <p className="text-xs text-gray-500 leading-tight capitalize">
          {dayName}
        </p>
        <p className="text-lg sm:text-2xl font-black text-[#1a2744] leading-none">
          {day}. {monthShort}
        </p>
        <p className="text-xs font-bold text-gray-500">{yearShort}</p>
      </div>

      {/* Event info */}
      <div className="flex-1 min-w-0">
        <p className="font-black text-base sm:text-xl text-[#1a2744] truncate uppercase">
          {event.city}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
          <Clock size={10} /> {event.time} &nbsp;·&nbsp;
          <MapPin size={10} />
          <span className="truncate">{event.venue}</span>
        </p>
      </div>

      {/* Trust badges — hidden on very small screens */}
      <div className="hidden sm:flex items-center gap-1 shrink-0">
        <div className="w-7 h-7 rounded-full border-2 border-sky-400 bg-sky-50 flex items-center justify-center">
          <Handshake size={13} className="text-sky-500" />
        </div>
        <div className="w-7 h-7 rounded-full border-2 border-green-400 bg-green-50 flex items-center justify-center">
          <CheckCircle size={13} className="text-green-500" />
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="text-right">
          <p className="text-xs text-gray-500">Da</p>
          <p className="font-black text-sm sm:text-base text-[#1a2744]">
            {minPrice != null
              ? `€ ${minPrice.toFixed(2).replace(".", ",")}`
              : "N/D"}
          </p>
          <p className="text-xs text-gray-400">{ticketCount} offerte</p>
        </div>
        <Link
          href={`/tickets/all/${artistSlug}/${event.artistId}/${event.numericId}`}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Visualizza
        </Link>
      </div>
    </div>
  );
}

// ─── Page content ─────────────────────────────────────────────────────────────

function ArtistPageContent({
  artistSlug,
  artistId,
}: {
  artistSlug: string;
  artistId: number;
}) {
  const artist = getArtistBySlug(artistSlug);
  const events = getEventsByArtistId(artistId);
  const [bioExpanded, setBioExpanded] = useState(false);

  if (!artist || events.length === 0) {
    return (
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500 font-medium">Artista non trovato</p>
          <Link
            href="/cerca"
            className="text-[#1a2744] hover:underline text-sm mt-2 block"
          >
            ← Torna alla ricerca
          </Link>
        </div>
      </main>
    );
  }

  const bioLines = artist.bio.split("\n").filter(Boolean);
  const bioPreview = bioLines.slice(0, 2).join("\n");

  return (
    <main className="flex-1 bg-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center gap-1 text-sm text-[#1a2744]">
          <Link href="/" className="hover:underline">
            fanSALE
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/tickets/all" className="hover:underline">
            Concerti
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/tickets/all" className="hover:underline">
            Pop &amp; Rock
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-600">{artist.name}</span>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto text-sm text-gray-600">
          fanSALE è un mercato secondario di rivendita di biglietti, dove il
          prezzo dei biglietti è sempre uguale al prezzo originale.
        </div>
      </div>

      {/* Artist banner */}
      <ArtistBanner
        name={artist.name}
        color={artist.color}
        rating={artist.rating}
        ratingCount={artist.ratingCount}
      />

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4">
        {/* Artist bio intro */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {artist.name} - {bioLines[0]}
          </p>
        </div>

        {/* Events / tickets section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-3 sm:px-5 py-3 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">Biglietti</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {events.map((event) => (
              <EventRow
                key={event.numericId}
                event={event}
                artistSlug={artistSlug}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Legenda</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-green-400 bg-green-50 flex items-center justify-center shrink-0">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <div>
                <p className="font-black text-sm text-gray-900">
                  TICKETONE TICKETCHECK!
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Biglietti verificati e garantiti con TicketOne Ticketcheck
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-sky-400 bg-sky-50 flex items-center justify-center shrink-0">
                <Handshake size={28} className="text-sky-500" />
              </div>
              <div>
                <p className="font-black text-sm text-gray-900">FAIR DEAL</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Rivendi i biglietti nominativi all&apos;identico prezzo del
                  biglietto originale.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alert offerte */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Alert offerte
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Non hai trovato l&apos;evento che stavi cercando? Il nostro Alert
            Offerte ti informa non appena le offerte per l&apos;evento
            desiderato saranno disponibili su fanSALE.{" "}
            <Link
              href="/login"
              className="text-[#1a2744] hover:underline font-medium"
            >
              Crea il tuo Alert Offerte ▶
            </Link>
          </p>
        </div>

        {/* Vendi biglietti */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Vendi biglietti
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Hai acquistato dei biglietti per {artist.name} ma non puoi andare
            all&apos;evento? Con fanSALE puoi{" "}
            <Link
              href="/sell"
              className="text-[#1a2744] hover:underline font-medium"
            >
              vendere ▶
            </Link>{" "}
            i tuoi biglietti legalmente e nel rispetto dei veri fan.
          </p>
        </div>

        {/* Biografia */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Biografia</h2>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            {(bioExpanded ? artist.bio : bioPreview)
              .split("\n")
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            {!bioExpanded && bioLines.length > 2 && (
              <p className="text-gray-400">...</p>
            )}
          </div>
          {bioLines.length > 2 && (
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="text-[#1a2744] hover:underline text-sm font-medium mt-2 flex items-center gap-1"
            >
              {bioExpanded ? (
                <>
                  <ChevronUp size={14} /> Mostra meno
                </>
              ) : (
                <>Continua a leggere ▶</>
              )}
            </button>
          )}
        </div>

        {/* Consigliati */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-bold text-gray-800 mb-2">
            Consigliati da fanSALE
          </p>
          <div className="flex flex-wrap gap-1 text-sm">
            {[
              { label: "Elodie Biglietti", href: "/tickets/all/elodie/334455" },
              {
                label: "Annalisa Biglietti",
                href: "/tickets/all/annalisa/345678",
              },
              { label: "Elisa Biglietti", href: "/tickets/all/elisa/445566" },
              {
                label: "Cesare Cremonini Biglietti",
                href: "/tickets/all/cesare-cremonini/556677",
              },
              {
                label: "Claudio Baglioni Biglietti",
                href: "/tickets/all/claudio-baglioni/667788",
              },
              {
                label: "Negramaro Biglietti",
                href: "/tickets/all/negramaro/778899",
              },
              {
                label: "Max Pezzali Biglietti",
                href: "/tickets/all/max-pezzali/889900",
              },
            ].map((a, i, arr) => (
              <span key={a.label} className="flex items-center">
                <Link href={a.href} className="text-[#1a2744] hover:underline">
                  {a.label}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-gray-400 mx-1">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────

export default function ArtistTicketsPage({
  params,
}: {
  params: Promise<{ artistSlug: string; artistId: string }>;
}) {
  const { artistSlug, artistId } = use(params);
  const numericArtistId = parseInt(artistId, 10);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-40 bg-gray-300 rounded" />
              <div className="h-32 bg-white rounded border border-gray-200" />
            </div>
          </main>
        }
      >
        <ArtistPageContent artistSlug={artistSlug} artistId={numericArtistId} />
      </Suspense>
      <Footer />
    </div>
  );
}
