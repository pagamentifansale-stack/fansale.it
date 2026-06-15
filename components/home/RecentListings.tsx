import Link from "next/link";

const recommendedArtists = [
  "Elodie Biglietti",
  "Annalisa Biglietti",
  "Elisa Biglietti",
  "Cesare Cremonini Biglietti",
  "Claudio Baglioni Biglietti",
  "Negramaro Biglietti",
  "Max Pezzali Biglietti",
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
            <span key={artist} className="flex items-center">
              <Link
                href={`/cerca?q=${encodeURIComponent(artist)}`}
                className="text-sm text-[#1a2744] hover:underline"
              >
                {artist}
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
