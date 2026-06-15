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
  Handshake,
  CheckCircle,
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

  // Support both old slug-based lookup and new numeric offerId lookup
  const offerIdNum = parseInt(ticketId, 10);
  const isNumeric = !isNaN(offerIdNum);

  // Try numeric offerId first, then fall back to slug-based lookup
  let data = isNumeric
    ? (() => {
        const { getTicketByOfferId } = require("@/lib/mockTickets");
        return getTicketByOfferId(offerIdNum);
      })()
    : null;
  if (!data && eventSlug) {
    data = getMockTicketData(eventSlug, ticketId);
  }

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
            href="/cerca"
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
    ? `/checkout/${isNumeric ? offerIdNum : ticketId}?offerId=${isNumeric ? offerIdNum : ticketId}&qty=${safeQty}&attendees=${encodeURIComponent(
        attendeeNames.slice(0, safeQty).join("|"),
      )}`
    : "#";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Back link */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="max-w-4xl mx-auto">
          <Link
            href={
              data
                ? `/tickets/all/${data.event.artistSlug}/${data.event.artistId}/${data.event.numericId}`
                : eventSlug
                  ? `/evento/${eventSlug}/biglietti`
                  : "/cerca"
            }
            className="flex items-center gap-1 text-[#1a2744] text-sm font-medium hover:underline"
          >
            <ArrowLeft size={15} />
            Torna a tutte le offerte
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-5 space-y-3">
        {/* Event header — compact on mobile */}
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
          <h1 className="text-base font-black text-gray-900 leading-tight">
            {event.artist}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">{event.eventTitle}</p>
          <p className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="flex items-center gap-1">
              <Calendar size={11} /> {event.date} {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {event.venue}, {event.city}
            </span>
          </p>
        </div>

        {/* Lock banner */}
        {isLocked && ticket.locked_until && (
          <LockBanner lockedUntil={ticket.locked_until} />
        )}

        {/* Ticket table — matches reference screenshot */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Quantità</span>
            <span className="text-center">Settore / Posto</span>
            <span className="text-right">Ordine</span>
          </div>
          {/* Ticket row */}
          <div className="grid grid-cols-[auto_1fr_auto] gap-3 px-3 py-3 items-center border-b border-gray-100">
            {/* Qty selector */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-gray-600 text-sm hover:bg-gray-50 disabled:opacity-40"
              >
                −
              </button>
              <span className="font-bold text-sm w-5 text-center">
                {safeQty}
              </span>
              <button
                onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                disabled={quantity >= maxQty}
                className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-gray-600 text-sm hover:bg-gray-50 disabled:opacity-40"
              >
                +
              </button>
            </div>
            {/* Section info */}
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-800 truncate">
                {ticket.section}
              </p>
              {ticket.row && (
                <p className="text-xs text-gray-500">{ticket.row}</p>
              )}
              <p className="text-xs font-bold text-gray-700 mt-0.5">
                Prezzo fisso € {ticket.price.toFixed(2).replace(".", ",")}
              </p>
            </div>
            {/* Badges */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-7 h-7 rounded-full border-2 border-sky-400 bg-sky-50 flex items-center justify-center">
                <Handshake size={13} className="text-sky-500" />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-green-400 bg-green-50 flex items-center justify-center">
                <CheckCircle size={13} className="text-green-500" />
              </div>
            </div>
          </div>

          {/* Seleziona numero biglietti label */}
          <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
            Seleziona il numero di biglietti: <strong>{safeQty}</strong>
            <span className="text-gray-400 ml-2">
              (max {maxQty} disponibili)
            </span>
          </div>

          {/* Price breakdown — receipt style */}
          <div className="divide-y divide-gray-50">
            <div className="flex justify-between px-3 py-2 text-sm">
              <span className="text-gray-600">Suddivisione offerta:</span>
              <span className="font-semibold text-gray-800">Totale</span>
            </div>
            <div className="flex justify-between px-3 py-2 text-sm">
              <span className="text-gray-600">
                {safeQty} bigliett{safeQty === 1 ? "o" : "i"} ×{" "}
                {formatCurrency(ticket.price)}
              </span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between px-3 py-2 text-sm">
              <span className="text-gray-600">Commissioni di servizio:</span>
              <span className="font-semibold">
                {formatCurrency(serviceFee)}
              </span>
            </div>
            <div className="flex justify-between px-3 py-2 text-sm">
              <span className="text-gray-600">Consegna del biglietto con:</span>
              <span className="font-semibold text-[#1a2744]">TicketOne</span>
            </div>
            <div className="flex justify-between px-3 py-2.5 bg-gray-50">
              <span className="font-black text-gray-900">Prezzo fisso:</span>
              <span className="font-black text-lg text-gray-900">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="px-3 py-1.5 text-right">
              <span className="text-xs text-gray-400">
                incl. IVA, più costi di consegna
              </span>
            </div>
          </div>

          {/* Buy button */}
          <div className="px-3 pb-3 pt-1">
            <Link
              href={checkoutHref}
              onClick={(e) => {
                if (!canCheckout) e.preventDefault();
              }}
              className={`w-full block text-center py-3.5 rounded-lg font-black text-base transition-colors ${
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
                  ? `Inserisci ${missingNames} nome${missingNames > 1 ? "i" : ""}`
                  : "Acquista"}
            </Link>
            {missingNames > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2 text-center">
                ⚠️ Inserisci il nome e cognome di ogni partecipante per
                procedere all&apos;acquisto.
              </p>
            )}
          </div>
        </div>

        {/* Attendee names */}
        {ticket.isNumbered && safeQty > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users size={15} className="text-[#1a2744]" />
              <p className="text-sm font-semibold text-gray-800">
                Dati degli intestatari
              </p>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              I biglietti sono nominativi. Inserisci nome e cognome esattamente
              come sul documento d&apos;identità.
            </p>
            <div className="space-y-2">
              {selectedSeats.map((seat, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Partecipante {i + 1} —{" "}
                    <span className="font-normal text-gray-400">{seat}</span>
                  </label>
                  <input
                    type="text"
                    value={attendeeNames[i] || ""}
                    onChange={(e) => handleAttendeeName(i, e.target.value)}
                    placeholder="Nome e Cognome"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-3">
              ⚠️ I nomi non potranno essere modificati dopo l&apos;acquisto.
              Porta un documento d&apos;identità al concerto.
            </p>
          </div>
        )}

        {/* Trust badges — horizontal on mobile */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <Shield size={22} className="text-green-500" />
              <p className="text-xs font-semibold text-gray-700 leading-tight">
                Biglietto verificato
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap size={22} className="text-yellow-500" />
              <p className="text-xs font-semibold text-gray-700 leading-tight">
                Consegna entro 24h
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Star size={22} className="text-blue-500" />
              <p className="text-xs font-semibold text-gray-700 leading-tight">
                Prezzo originale
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-700 mb-1.5">
            Descrizione
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {showFullDesc
              ? ticket.description
              : ticket.description.slice(0, 120) +
                (ticket.description.length > 120 ? "..." : "")}
          </p>
          {ticket.description.length > 120 && (
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

        {/* Seller + actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Venditore</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#1a2744] flex items-center justify-center text-white font-bold text-sm">
                {ticket.seller.username[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm flex items-center gap-1">
                  {ticket.seller.username}
                  {ticket.seller.verified && (
                    <Shield size={13} className="text-green-500" />
                  )}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  {ticket.seller.rating} · {ticket.seller.successful_sales}{" "}
                  vendite
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-yellow-500">
                <Heart size={14} /> Preferiti
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#1a2744]">
                <Share2 size={14} /> Condividi
              </button>
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
