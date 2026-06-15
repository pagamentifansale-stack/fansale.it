import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Header */}
        <div className="bg-[#1a2744] rounded-xl p-8 text-white">
          <h1 className="text-3xl font-black mb-2">
            Privacy Policy fan<span className="text-yellow-400">SALE</span>
          </h1>
          <p className="text-gray-300 text-sm">
            Ultimo aggiornamento: gennaio 2025
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              1. Titolare del trattamento
            </h2>
            <p>
              Il titolare del trattamento dei dati personali è fanSALE S.r.l.,
              con sede legale in Italia. Per qualsiasi richiesta relativa alla
              privacy, contattaci all&apos;indirizzo:{" "}
              <a
                href="mailto:privacy@fansale.it"
                className="text-[#1a2744] hover:underline font-medium"
              >
                privacy@fansale.it
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              2. Dati raccolti
            </h2>
            <p className="mb-2">
              Raccogliamo i seguenti dati personali per fornire il nostro
              servizio:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Data di nascita (per verifica età)</li>
              <li>IBAN (per i venditori, ai fini del pagamento)</li>
              <li>Dati di navigazione e cookie tecnici</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              3. Finalità del trattamento
            </h2>
            <p className="mb-2">I dati vengono trattati per:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Gestione delle transazioni di acquisto e vendita</li>
              <li>Verifica dell&apos;identità degli utenti</li>
              <li>Comunicazioni relative agli ordini</li>
              <li>Adempimenti fiscali e contabili</li>
              <li>Prevenzione delle frodi</li>
              <li>
                Invio di comunicazioni commerciali (solo con consenso esplicito)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              4. Base giuridica
            </h2>
            <p>
              Il trattamento dei dati è basato sull&apos;esecuzione del
              contratto (art. 6 par. 1 lett. b GDPR), sull&apos;adempimento di
              obblighi legali (art. 6 par. 1 lett. c GDPR) e, per le
              comunicazioni commerciali, sul consenso dell&apos;interessato
              (art. 6 par. 1 lett. a GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              5. Conservazione dei dati
            </h2>
            <p>
              I dati personali vengono conservati per il tempo strettamente
              necessario alle finalità per cui sono stati raccolti, e comunque
              non oltre 10 anni dalla conclusione del rapporto contrattuale, in
              conformità agli obblighi fiscali e contabili.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              6. Diritti dell&apos;interessato
            </h2>
            <p className="mb-2">In conformità al GDPR, hai il diritto di:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Accedere ai tuoi dati personali</li>
              <li>Rettificare dati inesatti</li>
              <li>Richiedere la cancellazione dei dati</li>
              <li>Opporti al trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="mt-2">
              Per esercitare questi diritti, contattaci a{" "}
              <a
                href="mailto:privacy@fansale.it"
                className="text-[#1a2744] hover:underline font-medium"
              >
                privacy@fansale.it
              </a>
            </p>
          </section>

          <section id="cookie">
            <h2 className="text-base font-bold text-gray-900 mb-2">
              7. Cookie
            </h2>
            <p className="mb-2">Utilizziamo i seguenti tipi di cookie:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>
                <strong>Cookie tecnici:</strong> necessari per il funzionamento
                del sito
              </li>
              <li>
                <strong>Cookie analitici:</strong> per migliorare
                l&apos;esperienza utente (anonimizzati)
              </li>
              <li>
                <strong>Cookie di marketing:</strong> solo con il tuo consenso
                esplicito
              </li>
            </ul>
            <p className="mt-2">
              Puoi gestire le preferenze sui cookie nelle impostazioni del tuo
              browser.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              8. Modifiche alla Privacy Policy
            </h2>
            <p>
              Ci riserviamo il diritto di modificare questa Privacy Policy in
              qualsiasi momento. Le modifiche saranno pubblicate su questa
              pagina con la data di aggiornamento. Ti invitiamo a consultare
              periodicamente questa pagina.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
