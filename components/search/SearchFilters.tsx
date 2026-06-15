"use client"
import { SearchFilters as ISearchFilters } from "@/types"

export default function SearchFilters({ filters, onChange }: { filters: ISearchFilters; onChange: (f: ISearchFilters) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      <input
        placeholder="City"
        className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
        value={filters.city || ""}
        onChange={e => onChange({ ...filters, city: e.target.value })}
      />
    </div>
  )
}