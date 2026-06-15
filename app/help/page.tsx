import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown } from "lucide-react";

const faqBuyer = [
  {
    q: "Come funziona l'acquisto su fanSALE?",
    a: "fanSALE è un mercato secondario dove i fan possono rivendere i propri biglietti ad altri fan. Trovi l'evento, scegli il biglietto, paghi in modo sicuro e ricevi il biglietto a tuo nome entro 24 ore.",
  },
  {
    q: "Il prezzo può essere superiore al valore nominale?",
    a: "No. Su fanSALE il prezzo dei biglietti è sempre uguale al prezzo originale di acquisto. Non è consentita la rivendita a prezzi maggiorati.",
  },
  {
    q: "Come ricevo il biglietto dopo l'acquisto?",
    a: "Il biglietto viene trasferito a tuo nome tramite il sistema di cambio nominativo di TicketOne. Riceverai un'email con le istruzioni entro 24 ore dalla conferma del pagamento.",
  },
  {
    q: "Cosa succede se l'evento viene annullato?",
    a: "In caso di annullamento dell'evento, riceverai un rimborso completo dell'importo pagato entro 5-7 giorni lavorativi.",
  },
  {
    q: "Posso acquistare più biglietti per lo stesso evento?",
    a: "Sì, puoi acquistare fino a 4 biglietti per lo stesso evento, a seconda della disponibilità del venditore.",
  },
];

const faqSeller = [
  {
    q: "Come posso vendere i miei biglietti?",
    a: "Vai alla sezione 'Vendi', compila il modulo con i dettagli del biglietto, carica la prova d'acquisto e pubblica il tuo annuncio. Riceverai un link da condividere con l'acquirente.",
  },
  {
    q: "Quando ricevo il pagamento?",
    a: "Il pagamento viene accreditato sul tuo IBAN entro 3-5 giorni lavorativi dalla conferma dell'acquisto da parte del compratore.",
  },
  {
    q: "Quali commissioni applica fanSALE?",
    a: "fanSALE applica una commissione del 7% sul prezzo di vendita. Questa commissione copre i costi di gestione della piattaforma e la garanzia della transazione.",
  },
  {
    q: "Posso vendere biglietti nominativi?",
    a: "Sì, puoi vendere biglietti nominativi. Il cambio nominativo viene gestito tramite il sistema ufficiale di TicketOne, nel rispetto delle normative vigenti.",
  },
  {
    q: "Entro quando posso mettere in vendita i biglietti?",
    a: "Puoi mettere in vendita i biglietti fino a 48 ore prima dell'evento. Dopo questa scadenza non sarà più possibile effettuare il cambio nominativo.",
  },
];

function FaqSection({
  title,
  items,
  id,
}: {
  title: string;
  items: { q: string; a: string }[];
  id: string;
}) {
  return (
    <div
      id={id}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none">
              <span className="font-medium text-gray-800 text-sm pr-4">
                {item.q}
              </span>
              <ChevronDown
                size={16}
                className="text-gray-400 shrink-0 group-open:rotate-180 transition-transform"
              />
            </summary>
            <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Header */}
        <div className="bg-[#1a2744] rounded-xl p-8 text-white text-center">
          <h1 className="text-3xl font-black mb-2">
            Centro Assistenza fan<span className="text-yellow-400">SALE</span>
          </h1>
          <p className="text-gray-300 text-sm">
            Trova le risposte alle domande più frequenti su acquisti, vendite e
            pagamenti.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Come funziona fanSALE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "Trova il biglietto",
                desc: "Cerca l'evento che ti interessa e scegli tra le offerte disponibili.",
              },
              {
                step: "2",
                title: "Acquista in sicurezza",
                desc: "Paga con carta di credito o PayPal. Il pagamento è protetto.",
              },
              {
                step: "3",
                title: "Ricevi il biglietto",
                desc: "Il biglietto viene trasferito a tuo nome entro 24 ore.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-[#1a2744] text-white font-black text-lg flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Buyer */}
        <FaqSection
          id="faq-buyer"
          title="FAQ dell'acquirente"
          items={faqBuyer}
        />

        {/* FAQ Seller */}
        <FaqSection
          id="faq-seller"
          title="FAQ del venditore"
          items={faqSeller}
        />

        {/* Contact */}
        <div
          id="contact"
          className="bg-white border border-gray-200 rounded-xl p-6 text-center"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Hai ancora domande?
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Il nostro team di assistenza è disponibile dal lunedì al venerdì,
            dalle 9:00 alle 18:00.
          </p>
          <a
            href="mailto:assistenza@fansale.it"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Contatta l&apos;assistenza
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
