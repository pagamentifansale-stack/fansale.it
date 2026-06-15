"use client";
import { useState, Suspense, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Star,
  Shield,
  Zap,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { formatCurrency, calculateTotal } from "@/utils/formatCurrency";
import { getMockTicketData } from "@/lib/mockTickets";

// ─── helpers ─────────────────────────────────────────────────────────────────

function LockBanner({ lockedUntil }: { lockedUntil: string }) {
  const { minutes, seconds, expired } = useCountdown(lockedUntil);
  if (expired) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 font-medium">
      ⚠️ Questo biglietto è temporaneamente riservato per un altro utente. Tempo
      rimanente:{" "}
      <strong>
        {minutes}:{String(seconds).padStart(2, "0")}
      </strong>
    </div>
  );
}

function getSelectedSeats(
  baseSeatNumber: number,
  quantity: number,
  isNumbered: boolean,
  row: string,
): string[] {
  if (!isNumbered) return [];
  return Array.from(
    { length: quantity },
    (_, i) => `${row} · Posto ${baseSeatNumber + i}`,
  );
}

// ─── Inner page (needs useSearchParams → must be inside Suspense) ─────────────

function TicketPageInner({ ticketId }: { ticketId: string }) {
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get("event") ?? "";
  const data = getMockTicketData(eventSlug, ticketId);

  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [attendeeNames, setAttendeeNames] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-md">
          <p className="text-gray-500 font-medium text-lg mb-2">
            Biglietto non trovato
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Il biglietto richiesto non esiste o non è più disponibile.
          </p>
          <Link
            href="/search"
            className="text-[#1a2744] hover:underline text-sm font-medium"
          >
            ← Torna alla ricerca
          </Link>
        </div>
      </div>
    );
  }

  const { event, ticket } = data;
  const maxQty = ticket.quantity;
  const safeQty = Math.max(1, Math.min(quantity, maxQty));
  const { subtotal, serviceFee, total } = calculateTotal(ticket.price, safeQty);
  const isLocked =
    ticket.locked_until && new Date(ticket.locked_until) > new Date();

  const selectedSeats = getSelectedSeats(
    ticket.seatNumber ?? 1,
    safeQty,
    ticket.isNumbered,
    ticket.row ?? "",
  );

  const handleAttendeeName = (index: number, value: string) => {
    setAttendeeNames((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // For nominative numbered tickets, all attendee names must be filled
  const missingNames =
    ticket.is_nominative && ticket.isNumbered
      ? attendeeNames.slice(0, safeQty).filter((n) => !n.trim()).length
      : 0;
  const canCheckout = !isLocked && missingNames === 0;

  const checkoutHref = canCheckout
    ? `/checkout/${ticketId}?event=${eventSlug}&qty=${safeQty}&attendees=${encodeURIComponent(
        attendeeNames.slice(0, safeQty).join("|"),
      )}`
    : "#";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Back link */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <Link
            href={eventSlug ? `/event/${eventSlug}/tickets` : "/search"}
            className="flex items-center gap-1 text-[#1a2744] text-sm font-medium hover:underline"
          >
            <ArrowLeft size={16} />
            Torna a tutte le offerte
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            {/* Event header */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h1 className="text-xl font-black text-gray-900">
                {event.artist}
              </h1>
              <p className="text-gray-600 font-medium">{event.eventTitle}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {event.venue}, {event.city}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {event.date}
                </span>
                <span className="flex items-center gap-1">🕘 {event.time}</span>
              </div>
            </div>

            {/* Lock banner */}
            {isLocked && ticket.locked_until && (
              <LockBanner lockedUntil={ticket.locked_until} />
            )}

            {/* Ticket info + purchase */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Quantità</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="font-bold text-lg w-6 text-center">
                      {safeQty}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(maxQty, quantity + 1))
                      }
                      disabled={quantity >= maxQty}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                    >
                      +
                    </button>
                    <span className="text-xs text-gray-400 ml-1">
                      (max {maxQty} disponibili)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Prezzo fisso</p>
                  <p className="text-2xl font-black text-[#1a2744]">
                    {formatCurrency(total)}
                  </p>
                  <p className="text-xs text-gray-400">incl. IVA</p>
                </div>
              </div>

              {/* Selected seats list */}
              {ticket.isNumbered && selectedSeats.length > 0 && (
                <div className="border border-gray-100 rounded-lg divide-y divide-gray-100 mb-4">
                  {selectedSeats.map((seat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3 text-sm"
                    >
                      <span className="text-gray-700 font-medium">
                        {ticket.section} · {seat}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {formatCurrency(ticket.price)}
                      </span>
                    </div>
                  ))}
                  <div className="px-4 py-2 text-xs text-gray-400">
                    Prezzo originale: {formatCurrency(ticket.price)} / biglietto
                  </div>
                </div>
              )}

              {/* Price breakdown */}
              <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>
                    {safeQty} bigliett{safeQty === 1 ? "o" : "i"} a{" "}
                    {formatCurrency(ticket.price)}:
                  </span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Commissioni di servizio:</span>
                  <span>{formatCurrency(serviceFee)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Consegna del biglietto con:</span>
                  <span className="font-semibold text-[#1a2744]">fanSALE</span>
                </div>
                <div className="flex justify-between font-black text-lg text-gray-900 border-t border-gray-200 pt-2 mt-2">
                  <span>Prezzo fisso:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Buy button */}
              <Link
                href={checkoutHref}
                onClick={(e) => {
                  if (!canCheckout) e.preventDefault();
                }}
                className={`mt-4 w-full block text-center py-4 rounded-lg font-black text-lg transition-colors ${
                  isLocked
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : missingNames > 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                }`}
              >
                {isLocked
                  ? "Temporaneamente non disponibile"
                  : missingNames > 0
                    ? `Inserisci ${missingNames} nome${missingNames > 1 ? "i" : ""} mancante${missingNames > 1 ? "i" : ""}`
                    : "Acquista"}
              </Link>
              {missingNames > 0 && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2 text-center">
                  ⚠️ Inserisci il nome e cognome di ogni partecipante per
                  procedere all&apos;acquisto.
                </p>
              )}
            </div>

            {/* Attendee names — shown when numbered seats */}
            {ticket.isNumbered && safeQty > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} className="text-[#1a2744]" />
                  <p className="text-sm font-semibold text-gray-800">
                    Dati degli intestatari
                  </p>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  I biglietti sono nominativi. Inserisci nome e cognome di ogni
                  partecipante esattamente come sul documento d&apos;identità.
                </p>
                <div className="space-y-3">
                  {selectedSeats.map((seat, i) => (
                    <div key={i}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Partecipante {i + 1} —{" "}
                        <span className="font-normal text-gray-500">
                          {seat}
                        </span>
                      </label>
                      <input
                        type="text"
                        value={attendeeNames[i] || ""}
                        onChange={(e) => handleAttendeeName(i, e.target.value)}
                        placeholder="Nome e Cognome"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744] transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-3">
                  ⚠️ I nomi inseriti non potranno essere modificati dopo
                  l&apos;acquisto. Porta un documento d&apos;identità al
                  concerto.
                </p>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Descrizione
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {showFullDesc
                  ? ticket.description
                  : ticket.description.slice(0, 100) +
                    (ticket.description.length > 100 ? "..." : "")}
              </p>
              {ticket.description.length > 100 && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-xs text-[#1a2744] font-semibold mt-1 flex items-center gap-1 hover:underline"
                >
                  {showFullDesc ? (
                    <>
                      <ChevronUp size={12} /> Mostra meno
                    </>
                  ) : (
                    <>
                      Continua a leggere <ChevronDown size={12} />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Seller info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Venditore
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a2744] flex items-center justify-center text-white font-bold text-sm">
                  {ticket.seller.username[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-1">
                    {ticket.seller.username}
                    {ticket.seller.verified && (
                      <Shield size={14} className="text-green-500" />
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-0.5">
                      <Star
                        size={11}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      {ticket.seller.rating}
                    </span>
                    <span>·</span>
                    <span>{ticket.seller.successful_sales} vendite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-500 transition-colors">
                <Heart size={16} /> <span>Aggiungi ai preferiti</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a2744] transition-colors">
                <Share2 size={16} /> <span>Dillo a un amico</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Trust badges */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield
                    size={18}
                    className="text-green-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Biglietto verificato
                    </p>
                    <p className="text-xs text-gray-500">
                      Ogni biglietto viene controllato prima della vendita
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap size={18} className="text-yellow-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Consegna veloce
                    </p>
                    <p className="text-xs text-gray-500">
                      Ricevi il nuovo biglietto a tuo nome entro 24h
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star size={18} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Prezzo originale
                    </p>
                    <p className="text-xs text-gray-500">
                      Il prezzo non supera mai il valore nominale del biglietto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────

export default function TicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = use(params);
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Caricamento...</p>
        </div>
      }
    >
      <TicketPageInner ticketId={ticketId} />
    </Suspense>
  );
}
