"use client";
import { Suspense, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { MOCK_ARTISTS, MOCK_EVENT_TICKETS } from "@/lib/mockTickets";

// Slug → new numeric URL mapping for redirects
function getNewUrlForSlug(slug: string): string | null {
  // Direct event slug match (e.g. "geolier-napoli-2026-06-26")
  const event = MOCK_EVENT_TICKETS[slug];
  if (event) {
    return `/tickets/all/${event.artistSlug}/${event.artistId}/${event.numericId}`;
  }
  // Artist slug match (e.g. "geolier")
  const artist = MOCK_ARTISTS[slug];
  if (artist) {
    return `/tickets/all/${artist.slug}/${artist.id}`;
  }
  // Try prefix match for artist (e.g. "geolier-napoli-..." → artist "geolier")
  for (const [artistSlug, artistData] of Object.entries(MOCK_ARTISTS)) {
    if (slug.startsWith(artistSlug)) {
      return `/tickets/all/${artistData.slug}/${artistData.id}`;
    }
  }
  return null;
}

// Artist data — replace with Supabase fetch
const ARTIST_DATA: Record<
  string,
  {
    name: string;
    bio: string;
    rating: number;
    ratingCount: number;
    color: string;
    events: Array<{
      id: string;
      slug: string;
      dayName: string;
      day: string;
      month: string;
      year: string;
      city: string;
      venue: string;
      time: string;
      minPrice: number;
      ticketCount: number;
    }>;
  }
> = {
  "vasco-rossi": {
    name: "Vasco Rossi",
    bio: 'Vasco Rossi, nato il 7 febbraio 1952 a Zocca (MO), è uno dei più grandi artisti della musica italiana. Soprannominato "il Blasco", è noto per il suo stile rock e per i suoi concerti negli stadi. Ha venduto oltre 50 milioni di dischi in tutto il mondo.',
    rating: 4.9,
    ratingCount: 2341,
    color: "from-blue-900 to-blue-700",
    events: [
      {
        id: "vr-roma",
        slug: "vasco-rossi-roma-2026-06-06",
        dayName: "sabato",
        day: "6",
        month: "giu",
        year: "26",
        city: "ROMA",
        venue: "Stadio Olimpico",
        time: "21.00",
        minPrice: 89.5,
        ticketCount: 18,
      },
      {
        id: "vr-milano",
        slug: "vasco-rossi-milano-2026-06-13",
        dayName: "sabato",
        day: "13",
        month: "giu",
        year: "26",
        city: "MILANO",
        venue: "Stadio San Siro",
        time: "21.00",
        minPrice: 94.0,
        ticketCount: 12,
      },
      {
        id: "vr-napoli",
        slug: "vasco-rossi-napoli-2026-06-20",
        dayName: "sabato",
        day: "20",
        month: "giu",
        year: "26",
        city: "NAPOLI",
        venue: "Stadio Maradona",
        time: "21.00",
        minPrice: 79.0,
        ticketCount: 7,
      },
      {
        id: "vr-bologna",
        slug: "vasco-rossi-bologna-2026-06-27",
        dayName: "sabato",
        day: "27",
        month: "giu",
        year: "26",
        city: "BOLOGNA",
        venue: "Stadio Dall'Ara",
        time: "21.00",
        minPrice: 82.0,
        ticketCount: 5,
      },
    ],
  },
  ultimo: {
    name: "Ultimo",
    bio: "Niccolò Moriconi, in arte Ultimo, nasce a Roma il 27 gennaio del 1996.\n\nDebutta nel 2017 con l'album Pianeti.\n\nNel 2018 vince Sanremo Giovani con Il ballo delle incertezze ed esce il secondo album Peter Pan. Nel 2019 pubblica il terzo disco Colpa delle favole e il 4 luglio si esibisce allo Stadio Olimpico di Roma con La Favola. Nel 2019 Ultimo è l'artista più ascoltato in Italia su Spotify e Apple Music. Il 22/10/21 esce il quarto album Solo, autoprodotto dalla sua etichetta Ultimo Records.\n\nDopo aver collaborato con Ed Sheeran nel brano 2step, a giugno 2022 prende il via Ultimo Stadi 2022, che con oltre 600.000 spettatori viene certificato diamante da SIAE. Con uno striscione esposto di fronte al Colosseo i suoi stessi fan lo ribattezzano \"Il principe degli stadi\". A febbraio 2023 esce l'album Alba, doppio disco di platino. Ultimo ha fin qui collezionato 84 dischi di platino e 18 dischi d'oro.",
    rating: 4.9,
    ratingCount: 1118,
    color: "from-red-900 to-red-700",
    events: [
      {
        id: "ul-roma",
        slug: "ultimo-roma-2026-07-04",
        dayName: "sabato",
        day: "4",
        month: "lug",
        year: "26",
        city: "ROMA",
        venue: "Tor Vergata",
        time: "20.30",
        minPrice: 77.28,
        ticketCount: 14,
      },
      {
        id: "ul-milano",
        slug: "ultimo-milano-2026-07-11",
        dayName: "sabato",
        day: "11",
        month: "lug",
        year: "26",
        city: "MILANO",
        venue: "Stadio San Siro",
        time: "20.30",
        minPrice: 95.0,
        ticketCount: 9,
      },
    ],
  },
  annalisa: {
    name: "Annalisa",
    bio: "Annalisa Scarrone, in arte Annalisa, nasce il 5 agosto 1985 a Savona. Cantautrice e personaggio televisivo italiano, è diventata famosa grazie alla sua partecipazione ad Amici di Maria De Filippi nel 2011. Ha pubblicato numerosi album di successo e ha partecipato più volte al Festival di Sanremo.",
    rating: 4.8,
    ratingCount: 876,
    color: "from-pink-900 to-pink-700",
    events: [
      {
        id: "an-bologna",
        slug: "annalisa-bologna-2025-11-14",
        dayName: "venerdì",
        day: "14",
        month: "nov",
        year: "25",
        city: "BOLOGNA",
        venue: "Unipol Arena",
        time: "21.00",
        minPrice: 45.0,
        ticketCount: 5,
      },
      {
        id: "an-milano",
        slug: "annalisa-milano-2025-11-22",
        dayName: "sabato",
        day: "22",
        month: "nov",
        year: "25",
        city: "MILANO",
        venue: "Mediolanum Forum",
        time: "21.00",
        minPrice: 48.5,
        ticketCount: 11,
      },
      {
        id: "an-roma",
        slug: "annalisa-roma-2025-11-29",
        dayName: "sabato",
        day: "29",
        month: "nov",
        year: "25",
        city: "ROMA",
        venue: "Palazzo dello Sport",
        time: "21.00",
        minPrice: 46.0,
        ticketCount: 3,
      },
    ],
  },
  "bad-bunny": {
    name: "Bad Bunny",
    bio: "Bad Bunny, all'anagrafe Benito Antonio Martínez Ocasio, nasce il 10 marzo 1994 a Vega Baja, Porto Rico. È uno dei più grandi artisti della musica latina mondiale, noto per il suo stile che fonde trap latina, reggaeton e urban pop. Ha vinto numerosi Grammy e Latin Grammy, ed è stato l'artista più ascoltato su Spotify per tre anni consecutivi. Il suo tour mondiale 2025 'DeBÍ TiRAR MáS FOToS' è uno degli eventi musicali più attesi dell'anno in Italia.",
    rating: 4.9,
    ratingCount: 3102,
    color: "from-yellow-900 to-yellow-700",
    events: [
      {
        id: "bb-milano",
        slug: "bad-bunny-milano-2025-07-10",
        dayName: "giovedì",
        day: "10",
        month: "lug",
        year: "25",
        city: "MILANO",
        venue: "Stadio San Siro",
        time: "21.00",
        minPrice: 85.0,
        ticketCount: 22,
      },
      {
        id: "bb-roma",
        slug: "bad-bunny-roma-2025-07-13",
        dayName: "domenica",
        day: "13",
        month: "lug",
        year: "25",
        city: "ROMA",
        venue: "Stadio Olimpico",
        time: "21.00",
        minPrice: 88.0,
        ticketCount: 17,
      },
    ],
  },
  geolier: {
    name: "Geolier",
    bio: "Emanuele Palumbo, in arte Geolier, nasce il 26 marzo 2000 a Napoli. Rapper e cantante italiano, è uno degli artisti più ascoltati in Italia. Il suo stile mescola trap italiana e dialetto napoletano. Ha partecipato al Festival di Sanremo 2024 classificandosi secondo.",
    rating: 4.7,
    ratingCount: 654,
    color: "from-zinc-900 to-zinc-700",
    events: [
      {
        id: "ge-napoli-jun26",
        slug: "geolier-napoli-2026-06-26",
        dayName: "venerdì",
        day: "26",
        month: "giu",
        year: "26",
        city: "NAPOLI",
        venue: "Stadio Diego Armando Maradona",
        time: "21.00",
        minPrice: 59.0,
        ticketCount: 3,
      },
      {
        id: "ge-napoli-jun27",
        slug: "geolier-napoli-2026-06-27",
        dayName: "sabato",
        day: "27",
        month: "giu",
        year: "26",
        city: "NAPOLI",
        venue: "Stadio Diego Armando Maradona",
        time: "21.00",
        minPrice: 59.0,
        ticketCount: 2,
      },
      {
        id: "ge-napoli-jun28",
        slug: "geolier-napoli-2026-06-28",
        dayName: "domenica",
        day: "28",
        month: "giu",
        year: "26",
        city: "NAPOLI",
        venue: "Stadio Diego Armando Maradona",
        time: "21.00",
        minPrice: 59.0,
        ticketCount: 1,
      },
      {
        id: "ge-napoli-07",
        slug: "geolier-napoli-2026-06-07",
        dayName: "domenica",
        day: "7",
        month: "giu",
        year: "26",
        city: "NAPOLI",
        venue: "Stadio Maradona",
        time: "21.00",
        minPrice: 65.0,
        ticketCount: 20,
      },
      {
        id: "ge-milano",
        slug: "geolier-milano-2026-06-14",
        dayName: "domenica",
        day: "14",
        month: "giu",
        year: "26",
        city: "MILANO",
        venue: "Stadio San Siro",
        time: "21.00",
        minPrice: 68.0,
        ticketCount: 15,
      },
    ],
  },
};

function getArtistFromSlug(slug: string) {
  // Try direct match first
  if (ARTIST_DATA[slug]) return { key: slug, ...ARTIST_DATA[slug] };
  // Try to extract artist from event slug (e.g. "ultimo-roma-2026-07-04" -> "ultimo")
  for (const key of Object.keys(ARTIST_DATA)) {
    if (slug.startsWith(key)) return { key, ...ARTIST_DATA[key] };
  }
  return null;
}

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
        {/* Artist photo */}
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

function EventPageContent() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.slug as string) || "";
  const artist = getArtistFromSlug(slug);
  const [bioExpanded, setBioExpanded] = useState(false);

  // Redirect to new numeric URL if we can resolve it
  useEffect(() => {
    const newUrl = getNewUrlForSlug(slug);
    if (newUrl) {
      router.replace(newUrl);
    }
  }, [slug, router]);

  if (!artist) {
    return (
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500 font-medium">Evento non trovato</p>
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
  const bioFull = artist.bio;

  return (
    <main className="flex-1 bg-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center gap-1 text-sm text-[#1a2744]">
          <Link href="/" className="hover:underline">
            fanSALE
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/cerca?category=Concerti" className="hover:underline">
            Concerti
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/cerca?category=Pop+Rock" className="hover:underline">
            Pop & Rock
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

        {/* Tickets section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-3 sm:px-5 py-3 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">Biglietti</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {artist.events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-3 hover:bg-gray-50 transition-colors"
              >
                {/* Date */}
                <div className="text-center shrink-0 w-14 sm:w-20">
                  <p className="text-xs text-gray-500 leading-tight">
                    {event.dayName}
                  </p>
                  <p className="text-lg sm:text-2xl font-black text-[#1a2744] leading-none">
                    {event.day}. {event.month}
                  </p>
                  <p className="text-xs font-bold text-gray-500">
                    {event.year}
                  </p>
                </div>

                {/* Event info */}
                <div className="flex-1 min-w-0">
                  <p className="font-black text-base sm:text-xl text-[#1a2744] truncate">
                    {event.city}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                    <Clock size={10} /> {event.time} &nbsp;·&nbsp;
                    <MapPin size={10} />{" "}
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
                      € {event.minPrice.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <Link
                    href={`/evento/${event.slug}/biglietti`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Visualizza
                  </Link>
                </div>
              </div>
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
            desiderato saranno disponibili su fanSALE. Basta impostare i criteri
            di ricerca e riceverai le offerte più adeguate via mail
            nell&apos;intervallo di tempo desiderato.{" "}
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
            all&apos;evento? Nessun problema: con fanSALE, se l&apos;evento lo
            consente, puoi vendere i tuoi biglietti in modo semplice, veloce e
            sicuro attraverso il mercato on line di TicketOne. In questo modo
            puoi{" "}
            <Link
              href="/sell"
              className="text-[#1a2744] hover:underline font-medium"
            >
              vendere ▶
            </Link>{" "}
            i tuoi biglietti legalmente e nel rispetto dei veri fan, anche per
            eventi sold out. Per maggiori dettagli sulla rivendibilità dei
            biglietti{" "}
            <Link href="/help" className="text-[#1a2744] hover:underline">
              clicca qui
            </Link>
            .
          </p>
        </div>

        {/* Biografia */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Biografia</h2>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            {(bioExpanded ? bioFull : bioPreview)
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
              "Elodie Biglietti",
              "Annalisa Biglietti",
              "Elisa Biglietti",
              "Cesare Cremonini Biglietti",
              "Claudio Baglioni Biglietti",
              "Negramaro Biglietti",
              "Max Pezzali Biglietti",
            ].map((a, i, arr) => (
              <span key={a} className="flex items-center">
                <Link
                  href={`/cerca?q=${encodeURIComponent(a.replace(" Biglietti", ""))}`}
                  className="text-[#1a2744] hover:underline"
                >
                  {a}
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

export default function EventPage() {
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
        <EventPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}
