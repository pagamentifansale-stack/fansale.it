import Link from "next/link";
import { ArrowRight, Users, Euro, Ticket } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-200">
      {/* Info banner */}
      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 text-center text-sm text-gray-600">
        fanSALE è un mercato secondario di rivendita di biglietti, dove il
        prezzo dei biglietti è sempre uguale al prezzo originale.
      </div>

      {/* Main hero */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left: explainer graphic */}
          <div className="flex-1 flex flex-col items-center lg:items-start gap-6">
            <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
              {/* Seller side */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <Users size={32} className="text-amber-600" />
                </div>
                <div className="bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded">
                  VENDITORE
                </div>
                <ul className="text-xs text-gray-600 space-y-0.5 text-left">
                  <li>• nome e cognome</li>
                  <li>• data di nascita</li>
                  <li>• indirizzo e-mail</li>
                  <li>• numero di telefono</li>
                  <li>• IBAN</li>
                </ul>
              </div>

              {/* Arrow + fanSALE */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-[#1a2744] text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-1">
                  <Ticket size={16} />
                  fan<span className="text-yellow-400">SALE</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <ArrowRight size={20} className="text-sky-500" />
                  <Euro size={20} className="text-sky-500" />
                  <ArrowRight size={20} className="text-sky-500 rotate-180" />
                </div>
              </div>

              {/* Buyer side */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <Users size={32} className="text-orange-500" />
                </div>
                <div className="bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded">
                  NUOVO ACQUIRENTE
                </div>
                <ul className="text-xs text-gray-600 space-y-0.5 text-left">
                  <li>• nome e cognome</li>
                  <li>• data di nascita</li>
                  <li>• indirizzo e-mail</li>
                  <li>• numero di telefono</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex-1 bg-[#1a2744] rounded-2xl p-8 text-white text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-black mb-3 leading-tight">
              Hai acquistato i biglietti,
              <br />
              ma non puoi più partecipare?
            </h1>
            <p className="text-gray-300 mb-6 text-sm">
              Rivendi i tuoi biglietti in modo sicuro e veloce. fanSALE
              garantisce transazioni affidabili tra fan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/sell"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors text-center"
              >
                Vendi i tuoi biglietti
              </Link>
              <Link
                href="/search"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-lg transition-colors text-center border border-white/20"
              >
                Cerca biglietti
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-4">Enjoy the show 🎵</p>
          </div>
        </div>
      </div>
    </section>
  );
}
