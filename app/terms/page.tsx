import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Header */}
        <div className="bg-[#1a2744] rounded-xl p-8 text-white">
          <h1 className="text-3xl font-black mb-2">
            Termini e Condizioni fan
            <span className="text-yellow-400">SALE</span>
          </h1>
          <p className="text-gray-300 text-sm">
            Ultimo aggiornamento: gennaio 2025
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              1. Descrizione del servizio
            </h2>
            <p>
              fanSALE è una piattaforma di mercato secondario che consente ai
              fan di rivendere biglietti per eventi ad altri fan. fanSALE non è
              un rivenditore primario di biglietti e non è affiliato con gli
              organizzatori degli eventi.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              2. Politica dei prezzi
            </h2>
            <p>
              Su fanSALE il prezzo dei biglietti è sempre uguale al prezzo
              originale di acquisto. Non è consentita la rivendita a prezzi
              maggiorati (secondary ticketing speculativo). I venditori che
              violano questa politica verranno rimossi dalla piattaforma.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              3. Commissioni
            </h2>
            <p>
              fanSALE applica una commissione del 7% sul prezzo di vendita a
              carico del venditore. Questa commissione viene detratta
              automaticamente al momento del pagamento. Non sono previste
              commissioni aggiuntive per l&apos;acquirente.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              4. Responsabilità del venditore
            </h2>
            <p>
              Il venditore è responsabile dell&apos;autenticità dei biglietti
              messi in vendita. I biglietti devono essere originali e acquistati
              tramite canali ufficiali. La vendita di biglietti contraffatti è
              severamente vietata e comporta la sospensione immediata
              dell&apos;account e possibili azioni legali.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              5. Garanzie per l&apos;acquirente
            </h2>
            <p>
              fanSALE garantisce che ogni biglietto acquistato sulla piattaforma
              è autentico e verrà consegnato come descritto. In caso di
              problemi, fanSALE rimborserà integralmente l&apos;acquirente.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              6. Cancellazioni e rimborsi
            </h2>
            <p>
              In caso di annullamento o rinvio dell&apos;evento da parte
              dell&apos;organizzatore, l&apos;acquirente ha diritto al rimborso
              completo dell&apos;importo pagato. I rimborsi vengono elaborati
              entro 5-7 giorni lavorativi.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              7. Cambio nominativo
            </h2>
            <p>
              Il cambio nominativo dei biglietti viene effettuato tramite il
              sistema ufficiale di TicketOne. Il venditore è responsabile di
              completare la procedura di cambio nominativo entro i termini
              stabiliti dall&apos;organizzatore dell&apos;evento.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              8. Legge applicabile
            </h2>
            <p>
              I presenti Termini e Condizioni sono regolati dalla legge
              italiana. Per qualsiasi controversia è competente il Tribunale di
              Milano.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              9. Contatti
            </h2>
            <p>
              Per qualsiasi domanda relativa ai presenti Termini e Condizioni,
              contattaci all&apos;indirizzo:{" "}
              <a
                href="mailto:legal@fansale.it"
                className="text-[#1a2744] hover:underline font-medium"
              >
                legal@fansale.it
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
