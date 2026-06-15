"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Info, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// All fields as strings — we parse numbers manually in onSubmit
type SellFormRaw = {
  artist: string;
  event_title: string;
  venue: string;
  city: string;
  event_date: string;
  section: string;
  row: string;
  seat: string;
  quantity: string;
  price: string;
  description: string;
  seller_name: string;
  seller_email: string;
  seller_iban: string;
};

type SellFormErrors = Partial<Record<keyof SellFormRaw, string>>;

function validateSellForm(data: SellFormRaw): SellFormErrors {
  const errors: SellFormErrors = {};
  if (!data.artist || data.artist.length < 2)
    errors.artist = "Inserisci il nome dell'artista";
  if (!data.event_title || data.event_title.length < 2)
    errors.event_title = "Inserisci il titolo dell'evento";
  if (!data.venue || data.venue.length < 2)
    errors.venue = "Inserisci il nome del venue";
  if (!data.city || data.city.length < 2) errors.city = "Inserisci la città";
  if (!data.event_date) errors.event_date = "Inserisci la data dell'evento";
  const qty = parseInt(data.quantity, 10);
  if (isNaN(qty) || qty < 1 || qty > 10)
    errors.quantity = "Quantità tra 1 e 10";
  const price = parseFloat(data.price);
  if (isNaN(price) || price < 1)
    errors.price = "Il prezzo deve essere maggiore di 0";
  if (price > 10000) errors.price = "Prezzo massimo €10.000";
  if (!data.seller_name || data.seller_name.length < 2)
    errors.seller_name = "Inserisci il tuo nome";
  if (
    !data.seller_email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.seller_email)
  )
    errors.seller_email = "Email non valida";
  if (!data.seller_iban || data.seller_iban.replace(/\s/g, "").length < 15)
    errors.seller_iban = "IBAN non valido";
  return errors;
}

export default function SellPage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [listingId, setListingId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<SellFormErrors>({});

  const { register, handleSubmit, watch } = useForm<SellFormRaw>({
    defaultValues: { quantity: "1" },
  });

  const priceRaw = watch("price") || "0";
  const quantityRaw = watch("quantity") || "1";
  const price = parseFloat(priceRaw) || 0;
  const quantity = parseInt(quantityRaw, 10) || 1;
  const serviceFee = Math.round(price * quantity * 0.07 * 100) / 100;
  const youReceive = price * quantity - serviceFee;

  const onSubmit = async (data: SellFormRaw) => {
    const errors = validateSellForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setLoading(true);
    try {
      // TODO: Replace with real Supabase insert
      const id = `listing-${Date.now()}`;
      setListingId(id);
      setStep("success");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const listingUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/ticket/${listingId}`
      : `/ticket/${listingId}`;

  if (step === "success") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-lg w-full text-center shadow-sm">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-black text-gray-900 mb-2">
              Annuncio pubblicato!
            </h1>
            <p className="text-gray-600 mb-6">
              Il tuo biglietto è ora disponibile. Condividi questo link con il
              tuo acquirente:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Link del tuo annuncio:
              </p>
              <p className="font-mono text-sm text-[#1a2744] break-all font-semibold">
                {listingUrl}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(listingUrl)}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors"
              >
                📋 Copia link
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Il mio biglietto su fanSALE",
                      url: listingUrl,
                    });
                  }
                }}
                className="flex-1 bg-[#1a2744] hover:bg-[#243560] text-white font-bold py-3 rounded-lg transition-colors"
              >
                📤 Condividi
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Riceverai il pagamento sul tuo IBAN entro 3-5 giorni lavorativi
              dopo la conferma dell&apos;acquisto.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-1">
          Vendi il tuo biglietto
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Compila il modulo per pubblicare il tuo annuncio e ricevere il link da
          condividere con l&apos;acquirente.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Event info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1a2744] text-white text-xs flex items-center justify-center font-black">
                1
              </span>
              Informazioni sull&apos;evento
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Artista / Squadra *
                </label>
                <input
                  {...register("artist")}
                  placeholder="es. Vasco Rossi"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                />
                {formErrors.artist && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.artist}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Titolo evento *
                </label>
                <input
                  {...register("event_title")}
                  placeholder="es. Vasco Live 2026"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                />
                {formErrors.event_title && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.event_title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Venue *
                </label>
                <input
                  {...register("venue")}
                  placeholder="es. Stadio San Siro"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                />
                {formErrors.venue && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.venue}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Città *
                </label>
                <input
                  {...register("city")}
                  placeholder="es. Milano"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                />
                {formErrors.city && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Data e ora evento *
                </label>
                <input
                  {...register("event_date")}
                  type="datetime-local"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                />
                {formErrors.event_date && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.event_date}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Ticket details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1a2744] text-white text-xs flex items-center justify-center font-black">
                2
              </span>
              Dettagli del biglietto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Settore
                </label>
                <input
                  {...register("section")}
                  placeholder="es. Settore C6"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Fila
                </label>
                <input
                  {...register("row")}
                  placeholder="es. Fila 2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Posto
                </label>
                <input
                  {...register("seat")}
                  placeholder="es. Posto 10"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Quantità *
                </label>
                <input
                  {...register("quantity")}
                  type="number"
                  min={1}
                  max={10}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
                />
                {formErrors.quantity && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.quantity}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Prezzo per biglietto (€) *
                </label>
                <input
                  {...register("price")}
                  type="number"
                  step="0.01"
                  min={1}
                  placeholder="es. 52.90"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
                />
                {formErrors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.price}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Descrizione (opzionale)
              </label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Descrivi il biglietto, la visuale, il motivo della vendita..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] resize-none"
              />
            </div>

            {/* Fee preview */}
            {price > 0 && (
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm">
                <p className="font-semibold text-blue-800 mb-2 flex items-center gap-1">
                  <Info size={14} /> Riepilogo guadagno
                </p>
                <div className="space-y-1 text-blue-700">
                  <div className="flex justify-between">
                    <span>Prezzo di vendita:</span>
                    <span>{(price * quantity).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commissione fanSALE (7%):</span>
                    <span>- {serviceFee.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-blue-200 pt-1 mt-1">
                    <span>Ricevi sul tuo IBAN:</span>
                    <span>{youReceive.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Seller info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1a2744] text-white text-xs flex items-center justify-center font-black">
                3
              </span>
              I tuoi dati
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Nome e cognome *
                </label>
                <input
                  {...register("seller_name")}
                  placeholder="Mario Rossi"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
                />
                {formErrors.seller_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.seller_name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email *
                </label>
                <input
                  {...register("seller_email")}
                  type="email"
                  placeholder="mario@email.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744]"
                />
                {formErrors.seller_email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.seller_email}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  IBAN (per ricevere il pagamento) *
                </label>
                <input
                  {...register("seller_iban")}
                  placeholder="IT60 X054 2811 1010 0000 0123 456"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] font-mono"
                />
                {formErrors.seller_iban && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.seller_iban}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Upload proof */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1a2744] text-white text-xs flex items-center justify-center font-black">
                4
              </span>
              Carica prova del biglietto
            </h2>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-[#1a2744] transition-colors">
              <Upload size={32} className="text-gray-400 mb-2" />
              <p className="text-sm font-semibold text-gray-600">
                Clicca per caricare il biglietto
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, JPG, PNG — max 10MB
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <Info size={12} /> Il biglietto verrà verificato prima della
              pubblicazione
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-black text-lg py-4 rounded-xl transition-colors"
          >
            {loading
              ? "Pubblicazione in corso..."
              : "Pubblica annuncio e ottieni il link →"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
