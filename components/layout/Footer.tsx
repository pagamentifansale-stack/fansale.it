import Link from "next/link";

const footerLinks = {
  "Help & Contatti": [
    { label: "Servizio Clienti", href: "/help" },
    { label: "Servizi", href: "/help#servizi" },
    { label: "Top artisti", href: "/cerca" },
  ],
  "Domande frequenti": [
    { label: "FAQ dell'acquirente", href: "/help#faq-buyer" },
    { label: "FAQ del venditore", href: "/help#faq-seller" },
    { label: "Impostazioni Cookie", href: "/privacy#cookie" },
  ],
};

const paymentMethods = [
  { name: "Visa", bg: "bg-blue-700", text: "text-white", label: "VISA" },
  { name: "Mastercard", bg: "bg-red-600", text: "text-white", label: "MC" },
  { name: "Amex", bg: "bg-blue-500", text: "text-white", label: "AMEX" },
  { name: "PayPal", bg: "bg-blue-900", text: "text-white", label: "PayPal" },
  { name: "Klarna", bg: "bg-pink-400", text: "text-white", label: "Klarna" },
  { name: "Apple Pay", bg: "bg-black", text: "text-white", label: "🍎 Pay" },
  { name: "Google Pay", bg: "bg-white", text: "text-gray-800", label: "G Pay" },
  {
    name: "Postepay",
    bg: "bg-yellow-400",
    text: "text-gray-900",
    label: "Postepay",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-bold text-gray-900 mb-3 text-sm">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#1a2744] transition-colors"
                    >
                      • {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payment methods */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">
              Metodi di pagamento
            </h4>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((pm) => (
                <span
                  key={pm.name}
                  className={`${pm.bg} ${pm.text} text-xs font-bold px-2.5 py-1.5 rounded border border-gray-200 shadow-sm`}
                >
                  {pm.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#1a2744] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/help" className="hover:underline">
            Chi Siamo
          </Link>
          <span className="text-white/30">|</span>
          <Link href="/terms" className="hover:underline">
            Termini e Condizioni
          </Link>
          <span className="text-white/30">|</span>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <span className="text-white/30">|</span>
          <span>🇬🇧 EN</span>
        </div>
      </div>
    </footer>
  );
}
