"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronRight } from "lucide-react";

const categories = [
  "Concerti",
  "Mostre e Musei",
  "Teatro",
  "Altre manifestazioni",
  "Last minute",
  "Nuovi biglietti inseriti",
  "Biglietti a meno di 25 euro",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="bg-[#1a2744] text-white sticky top-0 z-50 shadow-lg">
      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="text-xl sm:text-2xl font-black tracking-tight">
            fan<span className="text-yellow-400">SALE</span>
          </span>
          <span className="hidden sm:block text-[10px] text-gray-300 font-medium">
            Biglietti da fan a fan
          </span>
        </Link>

        {/* Search bar — full width on mobile */}
        <form
          className="flex-1 flex items-center bg-white rounded overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `/cerca?q=${query}`;
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Artista, evento, città..."
            className="flex-1 px-3 py-2 text-gray-800 text-sm outline-none min-w-0"
          />
          <button
            type="submit"
            className="bg-white px-2.5 py-2 text-gray-500 hover:text-yellow-500 transition-colors shrink-0"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Desktop nav actions */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <Link
            href="/sell"
            className="px-4 py-2 bg-[#1a2744] border border-white/30 hover:bg-white/10 text-white text-sm font-semibold rounded transition-colors"
          >
            Vendi
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-[#1a2744] border border-white/30 hover:bg-white/10 text-white text-sm font-semibold rounded transition-colors"
          >
            Accedi
          </Link>
        </div>

        {/* Hamburger — always visible */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col items-center px-2 py-1.5 hover:bg-white/10 rounded transition-colors shrink-0"
          aria-label="Menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="text-[9px] mt-0.5 hidden sm:block">Menu</span>
        </button>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute right-2 sm:right-4 top-full mt-1 w-72 bg-white text-gray-800 shadow-xl rounded-b-lg z-50 border border-gray-100">
          {/* Mobile-only: Vendi + Accedi */}
          <div className="sm:hidden flex gap-2 p-3 border-b border-gray-100">
            <Link
              href="/sell"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-bold rounded-lg transition-colors"
            >
              Vendi biglietti
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2 bg-[#1a2744] hover:bg-[#243560] text-white text-sm font-bold rounded-lg transition-colors"
            >
              Accedi
            </Link>
          </div>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/cerca?category=${encodeURIComponent(cat)}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 border-b border-gray-100 last:border-0 text-sm font-medium transition-colors"
            >
              {cat}
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
