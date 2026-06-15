import Link from "next/link";

const recommendedArtists = [
  { label: "Elodie Biglietti", href: "/tickets/all/elodie/334455" },
  { label: "Annalisa Biglietti", href: "/tickets/all/annalisa/345678" },
  { label: "Elisa Biglietti", href: "/tickets/all/elisa/445566" },
  {
    label: "Cesare Cremonini Biglietti",
    href: "/tickets/all/cesare-cremonini/556677",
  },
  {
    label: "Claudio Baglioni Biglietti",
    href: "/tickets/all/claudio-baglioni/667788",
  },
  { label: "Negramaro Biglietti", href: "/tickets/all/negramaro/778899" },
  { label: "Max Pezzali Biglietti", href: "/tickets/all/max-pezzali/889900" },
];

export default function RecentListings() {
  return (
    <section className="bg-white border-t border-gray-200 py-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-sm font-bold text-gray-800 mr-2">
            Consigliati da fanSALE
          </span>
          {recommendedArtists.map((artist, i) => (
            <span key={artist.label} className="flex items-center">
              <Link
                href={artist.href}
                className="text-sm text-[#1a2744] hover:underline"
              >
                {artist.label}
              </Link>
              {i < recommendedArtists.length - 1 && (
                <span className="text-gray-400 mx-1">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
