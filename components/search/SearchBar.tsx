"use client"
import { useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import Input from "@/components/ui/Input"

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 300)

  return (
    <div className="w-full">
      <Input
        placeholder="Search artists, events, venues..."
        value={query}
        onChange={e => { setQuery(e.target.value); onSearch(debouncedQuery) }}
      />
    </div>
  )
}