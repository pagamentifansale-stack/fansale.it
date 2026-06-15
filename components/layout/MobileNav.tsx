"use client";
import Link from "next/link";

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-gray-950 px-4 py-2 md:hidden">
      <div className="flex justify-around">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-xs text-gray-400"
        >
          Home
        </Link>
        <Link
          href="/search"
          className="flex flex-col items-center gap-1 text-xs text-gray-400"
        >
          Search
        </Link>
        <Link
          href="/sell"
          className="flex flex-col items-center gap-1 text-xs text-gray-400"
        >
          Sell
        </Link>
        <Link
          href="/dashboard/buyer"
          className="flex flex-col items-center gap-1 text-xs text-gray-400"
        >
          Account
        </Link>
      </div>
    </div>
  );
}
