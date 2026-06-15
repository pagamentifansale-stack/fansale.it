"use client";
import { Suspense, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Handshake,
  MapPin,
  Clock,
  SlidersHorizontal,
  ArrowUpDown,
  Shield,
  Zap,
  Star,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  Users,
  X,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getArtistImage } from "@/lib/images";
import {
  getEventByNumericId,
  getTicketByOfferId,
  MockEvent,
  MockTicket,
} from "@/lib/mockTickets";
import { formatCurrency, calculateTotal } from "@/utils/formatCurrency";

// ─── Ticket detail panel (shown when ?offerId=X&ptc=1 is present) ─────────────

function TicketDetailPanel({
  ticket,
  event,
  artistSlug,
  artistId,
  eventId,
  onClose,
}: {
  ticket: MockTicket;
  event: MockEvent;
  artistSlug: string;
  artistId: number;
  eventId: number;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [attendeeNames, setAttendeeNames] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const maxQty = ticket.quantity;
  const safeQty = Math.max(1, Math.min(quantity, maxQty));
  const { subtotal, serviceFee, total } = calculateTotal(ticket.price, safeQty);
  const isLocked =
    ticket.locked_until && new Date(ticket.locked_until) > new Date();

  const missingNames =
    ticket.is_nominative && ticket.isNumbered
      ? attendeeNames.slice(0, safeQty).filter((n) => !n.trim()).length
      : 0;
  const canCheckout = !isLocked && missingNames === 0;

  const checkoutHref = canCheckout
    ? `/checkout/${ticket.offerId}?offerId=${ticket.offerId}&qty=${safeQty}&attendees=${encodeURIComponent(attendeeNames.slice(0, safeQty).join("|"))}`
    : "#";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <p className="font-black text-gray-900 text-sm">{event.artist}</p>
            <p className="text-xs text-gray-500">
              {event.date} · {event.venue}, {event.city}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Ticket info card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Column headers */}
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

            {/* Qty label */}
            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
              Seleziona il numero di biglietti: <strong>{safeQty}</strong>
              <span className="text-gray-400 ml-2">
                (max {maxQty} disponibili)
              </span>
            </div>

            {/* Price breakdown */}
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
                <span className="font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between px-3 py-2 text-sm">
                <span className="text-gray-600">Commissioni di servizio:</span>
                <span className="font-semibold">
                  {formatCurrency(serviceFee)}
                </span>
              </div>
              <div className="flex justify-between px-3 py-2 text-sm">
                <span className="text-gray-600">
                  Consegna del biglietto con:
                </span>
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
            </div>
          </div>

          {/* Attendee names for numbered tickets */}
          {ticket.isNumbered && safeQty > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users size={15} className="text-[#1a2744]" />
                <p className="text-sm font-semibold text-gray-800">
                  Dati degli intestatari
                </p>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                I biglietti sono nominativi. Inserisci nome e cognome
                esattamente come sul documento d&apos;identità.
              </p>
              <div className="space-y-2">
                {Array.from({ length: safeQty }, (_, i) => (
                  <div key={i}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Partecipante {i + 1}
                      {ticket.row && ticket.seatNumber != null && (
                        <span className="font-normal text-gray-400 ml-1">
                          — {ticket.row} · Posto {ticket.seatNumber + i}
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={attendeeNames[i] || ""}
                      onChange={(e) => {
                        const updated = [...attendeeNames];
                        updated[i] = e.target.value;
                        setAttendeeNames(updated);
                      }}
                      placeholder="Nome e Cognome"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust badges */}
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

          {/* Seller */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Venditore
            </p>
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
                    <Star
                      size={10}
                      className="text-yellow-400 fill-yellow-400"
                    />
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
    </div>
  );
}

// ─── Ticket listing row ───────────────────────────────────────────────────────

function TicketRow({
  ticket,
  artistSlug,
  artistId,
  eventId,
  isSelected,
}: {
  ticket: MockTicket;
  artistSlug: string;
  artistId: number;
  eventId: number;
  isSelected: boolean;
}) {
  const totalPrice = ticket.price * ticket.quantity;
  const href = `/tickets/all/${artistSlug}/${artistId}/${eventId}?offerId=${ticket.offerId}&ptc=1`;

  return (
    <Link
      href={href}
      className={`grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center px-3 sm:px-5 py-3 hover:bg-gray-50 transition-colors group ${isSelected ? "bg-yellow-50 border-l-4 border-yellow-400" : ""}`}
    >
      {/* Quantity */}
      <div className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center font-bold text-sm text-gray-800 shrink-0">
        {ticket.quantity}
      </div>

      {/* Section info */}
      <div className="min-w-0">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-semibold text-sm text-gray-800 truncate">
            {ticket.section}
          </span>
          {ticket.row && (
            <span className="text-gray-500 text-xs">· {ticket.row}</span>
          )}
          {ticket.seat && (
            <span className="text-gray-500 text-xs">· {ticket.seat}</span>
          )}
        </div>
        <p className="text-xs font-bold text-gray-700 mt-0.5">
          Prezzo fisso € {totalPrice.toFixed(2).replace(".", ",")}
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex items-center gap-1 shrink-0">
        <div className="w-7 h-7 rounded-full border-2 border-sky-400 bg-sky-50 flex items-center justify-center">
          <Handshake size={13} className="text-sky-500" />
        </div>
        <div className="w-7 h-7 rounded-full border-2 border-green-400 bg-green-50 flex items-center justify-center">
          <CheckCircle size={13} className="text-green-500" />
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight
        size={18}
        className="text-yellow-500 group-hover:translate-x-1 transition-transform shrink-0"
      />
    </Link>
  );
}

// ─── Inner page (uses useSearchParams — must be inside Suspense) ──────────────

function EventTicketsContent({
  artistSlug,
  artistId,
  eventId,
}: {
  artistSlug: string;
  artistId: number;
  eventId: number;
}) {
  const searchParams = useSearchParams();
  const offerIdParam = searchParams.get("offerId");
  const ptc = searchParams.get("ptc");
  const selectedOfferId =
    offerIdParam && ptc === "1" ? parseInt(offerIdParam, 10) : null;

  const event = getEventByNumericId(eventId);
  const [sortBy, setSortBy] = useState<"price" | "quantity">("price");

  // Lookup selected ticket
  const selectedTicketData = selectedOfferId
    ? getTicketByOfferId(selectedOfferId)
    : null;

  if (!event) {
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

  const tickets = Object.values(event.tickets);
  const sortedTickets = [...tickets].sort((a, b) =>
    sortBy === "price" ? a.price - b.price : a.quantity - b.quantity,
  );

  const artistPageHref = `/tickets/all/${artistSlug}/${artistId}`;
  const closeHref = `/tickets/all/${artistSlug}/${artistId}/${eventId}`;

  return (
    <main className="flex-1 bg-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center gap-1 text-sm text-[#1a2744] flex-wrap">
          <Link href="/" className="hover:underline">
            fanSALE
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/cerca?category=Concerti" className="hover:underline">
            Concerti
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/cerca?category=Pop+Rock" className="hover:underline">
            Pop &amp; Rock
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href={artistPageHref} className="hover:underline">
            {event.artist}
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href={artistPageHref} className="hover:underline">
            {event.eventTitle}
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-600">
            {event.city.toUpperCase()}, {event.date}
          </span>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto text-sm text-gray-600">
          fanSALE è un mercato secondario di rivendita di biglietti, dove il
          prezzo dei biglietti è sempre uguale al prezzo originale.
        </div>
      </div>

      {/* Artist + event banner */}
      <div className={`bg-gradient-to-r ${event.color}`}>
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center gap-6">
          <div className="w-28 h-28 rounded border-2 border-white/30 overflow-hidden shrink-0 relative bg-black/30">
            <Image
              src={getArtistImage(event.artist)}
              alt={event.artist}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">{event.artist}</h1>
            <p className="text-white/80 mt-1 flex items-center gap-2 text-sm">
              <Clock size={14} /> {event.date} {event.time}
              <span className="mx-1">·</span>
              <MapPin size={14} /> {event.venue}, {event.city}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 space-y-4">
        {/* Back link */}
        <Link
          href={artistPageHref}
          className="flex items-center gap-1 text-[#1a2744] text-sm hover:underline"
        >
          <ChevronLeft size={16} /> Torna alle date
        </Link>

        {/* Yellow resale info banner */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-sm text-gray-800 space-y-2">
          <p>
            <strong>RIVENDITA:</strong> {event.resaleInfo}
          </p>
          <p>
            <strong>CAMBIO NOMINATIVO:</strong> {event.nameChangeInfo}
          </p>
          <p>
            <strong>CONSEGNA BIGLIETTI:</strong> {event.deliveryInfo}
          </p>
        </div>

        {/* Tickets table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-3 sm:px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              Biglietti ({tickets.length} offerte)
            </h2>
            <div className="flex gap-1.5">
              <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                <SlidersHorizontal size={12} /> Filtri
              </button>
              <button
                onClick={() =>
                  setSortBy(sortBy === "price" ? "quantity" : "price")
                }
                className="flex items-center gap-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowUpDown size={12} /> Ordina
              </button>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-3 sm:px-5 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Qtà</span>
            <span>Settore / Posto</span>
            <span className="text-right">Ordine</span>
            <span className="w-5" />
          </div>

          <div className="flex">
            {/* Ticket rows */}
            <div className="flex-1 divide-y divide-gray-100">
              {sortedTickets.map((ticket) => (
                <TicketRow
                  key={ticket.offerId}
                  ticket={ticket}
                  artistSlug={artistSlug}
                  artistId={artistId}
                  eventId={eventId}
                  isSelected={ticket.offerId === selectedOfferId}
                />
              ))}
            </div>

            {/* Right: concert background image — desktop only */}
            <div
              className="hidden lg:block w-56 shrink-0 bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(to right, white, transparent), url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80')`,
              }}
            />
          </div>
        </div>

        {/* Alert offerte */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Alert offerte
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Non hai trovato quello che cercavi? Il nostro Alert Offerte ti
            informa non appena le offerte per l&apos;evento desiderato saranno
            disponibili su fanSALE.{" "}
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
            Hai acquistato i biglietti per {event.artist} al {event.date}{" "}
            {event.time}, {event.venue}, {event.city} ma non riesci a
            partecipare all&apos;evento? Con fanSALE puoi{" "}
            <Link
              href="/sell"
              className="text-[#1a2744] hover:underline font-medium"
            >
              vendere ▶
            </Link>{" "}
            i tuoi biglietti legalmente ai veri fan.
          </p>
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

      {/* Ticket detail panel — shown when ?offerId=X&ptc=1 */}
      {selectedTicketData && (
        <TicketDetailPanel
          ticket={selectedTicketData.ticket}
          event={selectedTicketData.event}
          artistSlug={artistSlug}
          artistId={artistId}
          eventId={eventId}
          onClose={() => {
            // Navigate to the same page without query params
            window.history.pushState({}, "", closeHref);
            window.location.href = closeHref;
          }}
        />
      )}
    </main>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────

export default function EventTicketsPage({
  params,
}: {
  params: Promise<{ artistSlug: string; artistId: string; eventId: string }>;
}) {
  const { artistSlug, artistId, eventId } = use(params);
  const numericArtistId = parseInt(artistId, 10);
  const numericEventId = parseInt(eventId, 10);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-40 bg-gray-300 rounded" />
              <div className="h-48 bg-white rounded border border-gray-200" />
            </div>
          </main>
        }
      >
        <EventTicketsContent
          artistSlug={artistSlug}
          artistId={numericArtistId}
          eventId={numericEventId}
        />
      </Suspense>
      <Footer />
    </div>
  );
}
