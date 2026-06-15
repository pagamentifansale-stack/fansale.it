"use client";
import { useState, useEffect, Suspense, use } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Shield,
  Clock,
  ChevronRight,
  CheckCircle,
  Lock,
  CreditCard,
  User,
  Truck,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatCurrency, calculateTotal } from "@/utils/formatCurrency";
import { useCountdown } from "@/hooks/useCountdown";
import PaymentStep from "./steps/PaymentStep";
import { getMockTicketData, MockEvent, MockTicket } from "@/lib/mockTickets";

const STEPS = [
  { id: "account", label: "Accesso", icon: User },
  { id: "details", label: "Dati", icon: User },
  { id: "delivery", label: "Consegna", icon: Truck },
  { id: "payment", label: "Pagamento", icon: CreditCard },
  { id: "confirmed", label: "Confermato", icon: CheckCircle },
];

function LockCountdownInner({ lockExpires }: { lockExpires: string }) {
  const { minutes, seconds, expired } = useCountdown(lockExpires);
  if (expired)
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 font-medium text-center">
        ⏰ Il tempo è scaduto. Il biglietto non è più riservato per te.
      </div>
    );
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-3">
      <Clock size={18} className="text-amber-600 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-amber-800">
          Biglietto riservato per te
        </p>
        <p className="text-xs text-amber-600">
          Completa l&apos;acquisto entro{" "}
          <strong className="text-orange-600">
            {minutes}:{String(seconds).padStart(2, "0")}
          </strong>{" "}
          minuti
        </p>
      </div>
    </div>
  );
}

function LockCountdown() {
  // Compute expiry client-side only to avoid SSR/client hydration mismatch
  const [lockExpires, setLockExpires] = useState<string | null>(null);
  useEffect(() => {
    setLockExpires(new Date(Date.now() + 30 * 60 * 1000).toISOString());
  }, []);

  // Don't render until client has set the expiry (avoids hydration mismatch)
  if (!lockExpires) return null;
  return <LockCountdownInner lockExpires={lockExpires} />;
}

const accountSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z
    .string()
    .min(6, "Minimo 6 caratteri")
    .optional()
    .or(z.literal("")),
  guest: z.boolean().optional(),
});

const detailsSchema = z.object({
  full_name: z.string().min(2, "Inserisci nome e cognome"),
  birth_date: z.string().min(1, "Inserisci la data di nascita"),
  phone: z.string().min(8, "Numero non valido"),
  address: z.string().min(5, "Inserisci l'indirizzo"),
  city: z.string().min(2, "Inserisci la città"),
  postal_code: z.string().min(4, "CAP non valido"),
});

type AccountForm = z.infer<typeof accountSchema>;
type DetailsForm = z.infer<typeof detailsSchema>;

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between mb-5 overflow-x-auto pb-1">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={step.id} className="flex items-center shrink-0">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  done
                    ? "bg-green-500 text-white"
                    : active
                      ? "bg-[#1a2744] text-white"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {done ? <CheckCircle size={14} /> : <Icon size={12} />}
              </div>
              <span
                className={`text-[9px] sm:text-[10px] mt-1 font-medium whitespace-nowrap ${active ? "text-[#1a2744]" : done ? "text-green-600" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-5 sm:w-10 mx-1 mb-4 shrink-0 ${i < currentStep ? "bg-green-400" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderSummary({
  quantity,
  attendeeNames,
  event,
  ticket,
}: {
  quantity: number;
  attendeeNames: string[];
  event: MockEvent;
  ticket: MockTicket;
}) {
  const { subtotal, serviceFee, processingFee, total } = calculateTotal(
    ticket.price,
    quantity,
  );

  const seats = ticket.isNumbered
    ? Array.from(
        { length: quantity },
        (_, i) => `${ticket.row} · Posto ${(ticket.seatNumber ?? 1) + i}`,
      )
    : [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
      <h3 className="font-bold text-gray-800 mb-4">Riepilogo ordine</h3>
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="font-semibold text-gray-800 text-sm">{event.artist}</p>
        <p className="text-xs text-gray-500">{event.eventTitle}</p>
        <p className="text-xs text-gray-500 mt-1">
          {event.venue}, {event.city}
        </p>
        <p className="text-xs text-gray-500">
          {event.date} · {event.time}
        </p>

        {seats.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
            {seats.map((seat, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-gray-600">
                  {ticket.section} · {seat}
                </span>
                <span className="font-semibold text-gray-700">
                  {formatCurrency(ticket.price)}
                </span>
              </div>
            ))}
          </div>
        )}

        {attendeeNames.some((n) => n.trim()) && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
              <Users size={11} /> Intestatari
            </p>
            {attendeeNames.slice(0, quantity).map((name, i) => (
              <p key={i} className="text-xs text-gray-500">
                {i + 1}.{" "}
                {name.trim() ? (
                  name
                ) : (
                  <span className="italic text-gray-400">Da inserire</span>
                )}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>
            {quantity} bigliett{quantity === 1 ? "o" : "i"} ×{" "}
            {formatCurrency(ticket.price)}
          </span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Commissioni di servizio (2%)</span>
          <span>{formatCurrency(serviceFee)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Commissioni di elaborazione</span>
          <span>{formatCurrency(processingFee)}</span>
        </div>
        <div className="flex justify-between font-black text-gray-900 border-t border-gray-200 pt-2 text-base">
          <span>Totale</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <p className="text-xs text-gray-400 text-right">incl. IVA</p>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-green-700 bg-green-50 rounded-lg p-2">
        <Shield size={14} className="shrink-0" />
        <span>Pagamento sicuro e garantito da fanSALE</span>
      </div>
    </div>
  );
}

function AccountStep({ onNext }: { onNext: (data: AccountForm) => void }) {
  const [mode, setMode] = useState<"guest" | "login" | "register">("guest");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountForm>({ resolver: zodResolver(accountSchema) });
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-bold text-gray-800 mb-4">Come vuoi procedere?</h2>
      <div className="flex gap-2 mb-6">
        {(["guest", "login", "register"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${mode === m ? "bg-[#1a2744] text-white border-[#1a2744]" : "bg-white text-gray-600 border-gray-300 hover:border-[#1a2744]"}`}
          >
            {m === "guest" ? "Ospite" : m === "login" ? "Accedi" : "Registrati"}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="la-tua@email.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        {mode !== "guest" && (
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Password *
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Continua <ChevronRight size={16} />
        </button>
      </form>
    </div>
  );
}

function DetailsStep({
  onNext,
  onBack,
  attendeeNames,
  onAttendeeNameChange,
  quantity,
  ticket,
}: {
  onNext: (data: DetailsForm) => void;
  onBack: () => void;
  attendeeNames: string[];
  onAttendeeNameChange: (index: number, value: string) => void;
  quantity: number;
  ticket: MockTicket;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsForm>({ resolver: zodResolver(detailsSchema) });

  const seats = ticket.isNumbered
    ? Array.from(
        { length: quantity },
        (_, i) => `${ticket.row} · Posto ${(ticket.seatNumber ?? 1) + i}`,
      )
    : [];

  // For nominative tickets, all attendee names must be filled
  const missingAttendees = ticket.is_nominative
    ? attendeeNames.slice(0, quantity).filter((n) => !n.trim()).length
    : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-bold text-gray-800 mb-4">I tuoi dati personali</h2>
      <p className="text-xs text-gray-500 mb-4">
        Questi dati verranno usati per emettere il nuovo biglietto a tuo nome.
      </p>

      {/* Attendee names — editable for nominative tickets */}
      {ticket.is_nominative && quantity > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5">
          <p className="text-xs font-semibold text-blue-800 mb-3 flex items-center gap-1">
            <Users size={12} /> Intestatari dei biglietti ({quantity} bigliett
            {quantity === 1 ? "o" : "i"}) *
          </p>
          <div className="space-y-2">
            {Array.from({ length: quantity }, (_, i) => (
              <div key={i}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Partecipante {i + 1}
                  {seats[i] ? (
                    <span className="font-normal text-gray-400 ml-1">
                      — {ticket.section} · {seats[i]}
                    </span>
                  ) : null}
                  {" *"}
                </label>
                <input
                  type="text"
                  value={attendeeNames[i] || ""}
                  onChange={(e) => onAttendeeNameChange(i, e.target.value)}
                  placeholder="Nome e Cognome"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
                    attendeeNames[i]?.trim()
                      ? "border-green-400 focus:border-green-500"
                      : "border-amber-300 focus:border-amber-500 bg-amber-50"
                  }`}
                />
              </div>
            ))}
          </div>
          {missingAttendees > 0 && (
            <p className="text-xs text-amber-700 mt-2 flex items-center gap-1">
              ⚠️ Inserisci il nome e cognome di tutti i partecipanti per
              continuare.
            </p>
          )}
          <p className="text-xs text-blue-600 mt-2">
            ℹ️ I nomi verranno usati per emettere i biglietti nominativi. Porta
            un documento d&apos;identità al concerto.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Nome e cognome (acquirente) *
            </label>
            <input
              {...register("full_name")}
              placeholder="Mario Rossi"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Data di nascita *
            </label>
            <input
              {...register("birth_date")}
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
            />
            {errors.birth_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.birth_date.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Numero di telefono *
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="+39 333 1234567"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Indirizzo *
            </label>
            <input
              {...register("address")}
              placeholder="Via Roma 1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Città *
            </label>
            <input
              {...register("city")}
              placeholder="Milano"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              CAP *
            </label>
            <input
              {...register("postal_code")}
              placeholder="20100"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
            />
            {errors.postal_code && (
              <p className="text-red-500 text-xs mt-1">
                {errors.postal_code.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Indietro
          </button>
          <button
            type="submit"
            disabled={missingAttendees > 0}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {missingAttendees > 0 ? (
              `Inserisci ${missingAttendees} nome${missingAttendees > 1 ? "i" : ""}`
            ) : (
              <>
                Continua <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function DeliveryStep({
  onNext,
  onBack,
}: {
  onNext: (method: "email" | "app") => void;
  onBack: () => void;
}) {
  const [method, setMethod] = useState<"email" | "app">("email");
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-bold text-gray-800 mb-4">Metodo di consegna</h2>
      <div className="space-y-3 mb-6">
        <label
          className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${method === "email" ? "border-[#1a2744] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          <input
            type="radio"
            name="delivery"
            value="email"
            checked={method === "email"}
            onChange={() => setMethod("email")}
            className="mt-0.5"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              📧 Email — fanSALE
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Ricevi il nuovo biglietto nominativo via email entro 24h
              dall&apos;acquisto
            </p>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Gratuito
            </p>
          </div>
        </label>
        <label
          className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${method === "app" ? "border-[#1a2744] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          <input
            type="radio"
            name="delivery"
            value="app"
            checked={method === "app"}
            onChange={() => setMethod("app")}
            className="mt-0.5"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              📱 App TicketOne
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Il biglietto viene trasferito direttamente nel tuo account
              TicketOne
            </p>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Gratuito
            </p>
          </div>
        </label>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-xs text-yellow-800">
        <strong>Importante:</strong> Il biglietto originale verrà invalidato e
        verrà emesso un nuovo biglietto a tuo nome. Porta un documento
        d&apos;identità al concerto.
      </div>
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Indietro
        </button>
        <button
          onClick={() => onNext(method)}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Continua <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ConfirmationStep({
  buyerEmail,
  quantity,
  attendeeNames,
  event,
  ticket,
}: {
  buyerEmail: string;
  quantity: number;
  attendeeNames: string[];
  event: MockEvent;
  ticket: MockTicket;
}) {
  const seats = ticket.isNumbered
    ? Array.from(
        { length: quantity },
        (_, i) => `Posto ${(ticket.seatNumber ?? 1) + i}`,
      )
    : [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={36} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">
        Acquisto confermato! 🎉
      </h2>
      <p className="text-gray-600 mb-6">
        Il tuo ordine è stato ricevuto. Riceverai{" "}
        {quantity === 1
          ? "il nuovo biglietto nominativo"
          : `i ${quantity} nuovi biglietti nominativi`}{" "}
        all&apos;indirizzo <strong>{buyerEmail}</strong> entro 24 ore.
      </p>
      <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Evento:</span>
          <span className="font-semibold">
            {event.artist} — {event.eventTitle}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Data:</span>
          <span className="font-semibold">
            {event.date} · {event.time}
          </span>
        </div>
        {seats.length > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-500">Posti:</span>
            <span className="font-semibold">
              {ticket.section} · {seats.join(", ")}
            </span>
          </div>
        )}
        {attendeeNames.some((n) => n.trim()) && (
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500">Intestatari:</span>
            {attendeeNames.slice(0, quantity).map((name, i) => (
              <span key={i} className="font-semibold text-right">
                {i + 1}. {name.trim() || "—"}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-500">Consegna:</span>
          <span className="font-semibold text-green-600">
            Via email entro 24h
          </span>
        </div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 mb-4">
        📋 Il biglietto originale è stato invalidato. Il tuo nuovo biglietto
        sarà emesso a tuo nome. Porta un documento d&apos;identità al concerto.
      </div>
      <a
        href="/"
        className="inline-block bg-[#1a2744] hover:bg-[#243560] text-white font-bold px-6 py-3 rounded-lg transition-colors"
      >
        Torna alla home
      </a>
    </div>
  );
}

// Inner component that uses useSearchParams (must be inside Suspense)
function CheckoutInner({ ticketId }: { ticketId: string }) {
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get("event") ?? "";
  const mockData = getMockTicketData(eventSlug, ticketId);

  // Fallback so the page still renders even without valid mock data
  const event =
    mockData?.event ??
    ({
      eventTitle: "Evento",
      artist: "Artista",
      venue: "Venue",
      city: "Città",
      date: "",
      time: "",
      tickets: {},
    } as MockEvent);
  const ticket =
    mockData?.ticket ??
    ({
      id: ticketId,
      quantity: 1,
      section: "",
      isNumbered: false,
      is_nominative: false,
      price: 0,
      description: "",
      seller: { username: "", rating: 5, verified: false, successful_sales: 0 },
      locked_until: null,
    } as MockTicket);

  const qty = parseInt(searchParams.get("qty") || "1", 10);
  const quantity = isNaN(qty) || qty < 1 ? 1 : Math.min(qty, ticket.quantity);
  const attendeesRaw = searchParams.get("attendees") || "";
  const initialAttendees = attendeesRaw
    ? decodeURIComponent(attendeesRaw).split("|")
    : Array(quantity).fill("");

  const [currentStep, setCurrentStep] = useState(0);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [detailsData, setDetailsData] = useState<DetailsForm | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "app">(
    "email",
  );
  const [attendeeNames, setAttendeeNames] =
    useState<string[]>(initialAttendees);
  const { total } = calculateTotal(ticket.price, quantity);

  const handleAttendeeNameChange = (index: number, value: string) => {
    setAttendeeNames((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-8">
      <h1 className="text-lg sm:text-xl font-black text-gray-900 mb-4 sm:mb-6">
        Acquisto biglietto
      </h1>

      <StepIndicator currentStep={currentStep} />

      {currentStep < 4 && <LockCountdown />}
      <div className="mt-3 sm:mt-4" />

      {/* Mobile order summary — collapsible, shown above form on small screens */}
      <div className="lg:hidden mb-4">
        <details className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-800">
                Riepilogo ordine
              </span>
              <span className="text-xs text-gray-500">— {event.artist}</span>
            </div>
            <span className="text-lg font-black text-[#1a2744]">
              {formatCurrency(calculateTotal(ticket.price, quantity).total)}
            </span>
          </summary>
          <div className="px-4 pb-4 border-t border-gray-100">
            <OrderSummary
              quantity={quantity}
              attendeeNames={attendeeNames}
              event={event}
              ticket={ticket}
            />
          </div>
        </details>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <AccountStep
              onNext={(data) => {
                setBuyerEmail(data.email);
                setCurrentStep(1);
              }}
            />
          )}
          {currentStep === 1 && (
            <DetailsStep
              onNext={(data) => {
                setDetailsData(data);
                setCurrentStep(2);
              }}
              onBack={() => setCurrentStep(0)}
              attendeeNames={attendeeNames}
              onAttendeeNameChange={handleAttendeeNameChange}
              quantity={quantity}
              ticket={ticket}
            />
          )}
          {currentStep === 2 && (
            <DeliveryStep
              onNext={(method) => {
                setDeliveryMethod(method);
                setCurrentStep(3);
              }}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <PaymentStep
              total={total}
              buyerEmail={buyerEmail}
              onSuccess={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 4 && (
            <ConfirmationStep
              buyerEmail={buyerEmail}
              quantity={quantity}
              attendeeNames={attendeeNames}
              event={event}
              ticket={ticket}
            />
          )}
        </div>

        {/* Desktop order summary — hidden on mobile (shown above instead) */}
        <div className="hidden lg:block lg:col-span-1">
          <OrderSummary
            quantity={quantity}
            attendeeNames={attendeeNames}
            event={event}
            ticket={ticket}
          />
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = use(params);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <Suspense
        fallback={
          <main className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Caricamento...</p>
          </main>
        }
      >
        <CheckoutInner ticketId={ticketId} />
      </Suspense>
      <Footer />
    </div>
  );
}
