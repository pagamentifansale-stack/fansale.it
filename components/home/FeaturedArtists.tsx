import Link from "next/link";
import { CheckCircle, Truck, Lock, Handshake } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    title: "TICKETCHECK!",
    description: "Biglietti verificati e garantiti con FanSwap TicketCheck",
    href: "/help#ticketcheck",
  },
  {
    icon: Truck,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    title: "È VELOCE!",
    description: "Biglietti disponibili in maniera trasparente e veloce.",
    href: "/help#veloce",
  },
  {
    icon: Lock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    title: "È SICURO!",
    description:
      "FanSwap assicura l'originalità dei biglietti e transazioni affidabili.",
    href: "/help#sicuro",
  },
  {
    icon: Handshake,
    color: "text-sky-500",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    title: "FAIR DEAL",
    description:
      "Rivendi i biglietti nominativi all'identico prezzo del biglietto originale.",
    href: "/help#fairdeal",
  },
];

export default function FeaturedArtists() {
  return (
    <section className="bg-white py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`flex flex-col items-center text-center p-6 rounded-xl border ${feature.borderColor} ${feature.bgColor}`}
              >
                <div
                  className={`w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md mb-4 border-4 ${feature.borderColor}`}
                >
                  <Icon size={36} className={feature.color} />
                </div>
                <h3 className="font-black text-sm text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="text-xs text-[#1a2744] font-semibold hover:underline flex items-center gap-1"
                >
                  Scopri di più ▸
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
