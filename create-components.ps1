$base = 'C:/Users/user/Desktop/fanswap'

function CreateFile($path, $content) {
    $fullPath = Join-Path $base $path
    $dir = Split-Path $fullPath -Parent
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.Encoding]::UTF8)
}

# UI Components
CreateFile 'components/ui/Input.tsx' @'
import { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ className, label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
      <input
        className={cn(
          "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}
'@

CreateFile 'components/ui/Badge.tsx' @'
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger"
  className?: string
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      variant === "default" && "bg-gray-700 text-gray-300",
      variant === "success" && "bg-green-900 text-green-300",
      variant === "warning" && "bg-yellow-900 text-yellow-300",
      variant === "danger" && "bg-red-900 text-red-300",
      className
    )}>
      {children}
    </span>
  )
}
'@

CreateFile 'components/ui/Card.tsx' @'
import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-xl border border-gray-800 bg-gray-900 p-6", className)}>
      {children}
    </div>
  )
}
'@

CreateFile 'components/ui/Modal.tsx' @'
"use client"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className={cn("relative z-10 rounded-xl bg-gray-900 p-6 shadow-xl", className)}>
        {children}
      </div>
    </div>
  )
}
'@

CreateFile 'components/ui/Spinner.tsx' @'
import { cn } from "@/lib/utils"

export default function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("animate-spin rounded-full border-2 border-gray-600 border-t-brand-500 h-6 w-6", className)} />
  )
}
'@

CreateFile 'components/ui/Avatar.tsx' @'
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Avatar({ src, alt = "Avatar", size = "md", className }: AvatarProps) {
  return (
    <div className={cn(
      "rounded-full bg-gray-700 overflow-hidden flex items-center justify-center",
      size === "sm" && "h-8 w-8",
      size === "md" && "h-10 w-10",
      size === "lg" && "h-14 w-14",
      className
    )}>
      {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : <span className="text-gray-400 text-sm">?</span>}
    </div>
  )
}
'@

CreateFile 'components/ui/Countdown.tsx' @'
"use client"
import { useCountdown } from "@/hooks/useCountdown"

export default function Countdown({ targetDate }: { targetDate: string }) {
  const { minutes, seconds, expired } = useCountdown(targetDate)
  if (expired) return <span className="text-red-400 font-mono">Expired</span>
  return (
    <span className="font-mono text-brand-400">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  )
}
'@

CreateFile 'components/ui/StepIndicator.tsx' @'
import { CheckoutStep } from "@/types"
import { cn } from "@/lib/utils"

export default function StepIndicator({ steps }: { steps: CheckoutStep[] }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
            step.completed && "bg-brand-500 text-white",
            step.active && !step.completed && "border-2 border-brand-500 text-brand-500",
            !step.active && !step.completed && "border-2 border-gray-600 text-gray-500"
          )}>
            {step.completed ? "✓" : i + 1}
          </div>
          <span className={cn("text-sm", step.active ? "text-white" : "text-gray-500")}>{step.label}</span>
          {i < steps.length - 1 && <div className="h-px w-8 bg-gray-700" />}
        </div>
      ))}
    </div>
  )
}
'@

CreateFile 'components/ui/FeeBreakdown.tsx' @'
import { formatCurrency } from "@/utils/formatCurrency"

interface FeeBreakdownProps {
  subtotal: number
  serviceFee: number
  processingFee: number
  total: number
}

export default function FeeBreakdown({ subtotal, serviceFee, processingFee, total }: FeeBreakdownProps) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
      <div className="flex justify-between"><span className="text-gray-400">Service fee</span><span>{formatCurrency(serviceFee)}</span></div>
      <div className="flex justify-between"><span className="text-gray-400">Processing fee</span><span>{formatCurrency(processingFee)}</span></div>
      <div className="flex justify-between border-t border-gray-700 pt-2 font-semibold"><span>Total</span><span className="text-brand-400">{formatCurrency(total)}</span></div>
    </div>
  )
}
'@

CreateFile 'components/ui/PriceTag.tsx' @'
import { formatCurrency } from "@/utils/formatCurrency"
import { cn } from "@/lib/utils"

interface PriceTagProps {
  price: number
  currency?: string
  className?: string
}

export default function PriceTag({ price, currency = "EUR", className }: PriceTagProps) {
  return (
    <span className={cn("font-bold text-brand-400", className)}>
      {formatCurrency(price, currency)}
    </span>
  )
}
'@

CreateFile 'components/ui/VerifiedBadge.tsx' @'
export default function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-900 px-2 py-0.5 text-xs font-medium text-blue-300">
      ✓ Verified
    </span>
  )
}
'@

CreateFile 'components/ui/StarRating.tsx' @'
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  className?: string
}

export default function StarRating({ rating, maxRating = 5, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-600"}>★</span>
      ))}
      <span className="ml-1 text-sm text-gray-400">({rating.toFixed(1)})</span>
    </div>
  )
}
'@

# Layout Components
CreateFile 'components/layout/Navbar.tsx' @'
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-950 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand-500">FanSwap</Link>
        <div className="flex items-center gap-4">
          <Link href="/search" className="text-gray-400 hover:text-white">Search</Link>
          <Link href="/sell" className="text-gray-400 hover:text-white">Sell</Link>
          <Link href="/login" className="text-gray-400 hover:text-white">Login</Link>
        </div>
      </div>
    </nav>
  )
}
'@

CreateFile 'components/layout/Footer.tsx' @'
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-6 text-sm text-gray-400">
          <Link href="/help" className="hover:text-white">Help</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </div>
        <p className="mt-4 text-xs text-gray-600">© 2024 FanSwap. All rights reserved.</p>
      </div>
    </footer>
  )
}
'@

CreateFile 'components/layout/MobileNav.tsx' @'
"use client"
import Link from "next/link"

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-gray-950 px-4 py-2 md:hidden">
      <div className="flex justify-around">
        <Link href="/" className="flex flex-col items-center gap-1 text-xs text-gray-400">Home</Link>
        <Link href="/search" className="flex flex-col items-center gap-1 text-xs text-gray-400">Search</Link>
        <Link href="/sell" className="flex flex-col items-center gap-1 text-xs text-gray-400">Sell</Link>
        <Link href="/dashboard/buyer" className="flex flex-col items-center gap-1 text-xs text-gray-400">Account</Link>
      </div>
    </div>
  )
}
'@

# Checkout Components
CreateFile 'components/checkout/CheckoutForm.tsx' @'
"use client"
export default function CheckoutForm() {
  return <div><h2 className="text-xl font-semibold">Checkout Form</h2></div>
}
'@

CreateFile 'components/checkout/PaymentForm.tsx' @'
"use client"
export default function PaymentForm() {
  return <div><h2 className="text-xl font-semibold">Payment Form</h2></div>
}
'@

CreateFile 'components/checkout/OrderSummary.tsx' @'
import { Ticket } from "@/types"
import PriceTag from "@/components/ui/PriceTag"

export default function OrderSummary({ ticket }: { ticket: Ticket }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
      <h3 className="font-semibold mb-2">Order Summary</h3>
      <PriceTag price={ticket.price} />
    </div>
  )
}
'@

CreateFile 'components/checkout/DeliveryOptions.tsx' @'
"use client"
export default function DeliveryOptions() {
  return <div><h2 className="text-xl font-semibold">Delivery Options</h2></div>
}
'@

CreateFile 'components/checkout/BuyerInfoForm.tsx' @'
"use client"
export default function BuyerInfoForm() {
  return <div><h2 className="text-xl font-semibold">Buyer Info Form</h2></div>
}
'@

CreateFile 'components/checkout/CheckoutSteps.tsx' @'
import { CheckoutStep } from "@/types"
import StepIndicator from "@/components/ui/StepIndicator"

export default function CheckoutSteps({ steps }: { steps: CheckoutStep[] }) {
  return (
    <div className="mb-8">
      <StepIndicator steps={steps} />
    </div>
  )
}
'@

# Ticket Components
CreateFile 'components/tickets/TicketCard.tsx' @'
import { Ticket } from "@/types"
import PriceTag from "@/components/ui/PriceTag"
import Badge from "@/components/ui/Badge"

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
      <div className="flex justify-between items-start">
        <div>
          {ticket.section && <p className="text-sm text-gray-400">Section {ticket.section}</p>}
          {ticket.row && <p className="text-sm text-gray-400">Row {ticket.row}</p>}
          <p className="text-sm text-gray-400">Qty: {ticket.quantity}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <PriceTag price={ticket.price} />
          <Badge variant={ticket.status === "available" ? "success" : "warning"}>{ticket.status}</Badge>
        </div>
      </div>
    </div>
  )
}
'@

CreateFile 'components/tickets/TicketListingCard.tsx' @'
import { Ticket } from "@/types"
import Link from "next/link"
import PriceTag from "@/components/ui/PriceTag"

export default function TicketListingCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link href={`/ticket/${ticket.id}`} className="block rounded-xl border border-gray-800 bg-gray-900 p-4 hover:border-brand-500 transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Ticket #{ticket.id.slice(0, 8)}</p>
          <p className="text-sm text-gray-400">Qty: {ticket.quantity}</p>
        </div>
        <PriceTag price={ticket.price} />
      </div>
    </Link>
  )
}
'@

CreateFile 'components/tickets/TicketUploadForm.tsx' @'
"use client"
export default function TicketUploadForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Ticket Proof</h2>
      <input type="file" accept="image/*,.pdf" className="block w-full text-sm text-gray-400" />
    </div>
  )
}
'@

CreateFile 'components/tickets/TicketProofPreview.tsx' @'
export default function TicketProofPreview({ url }: { url: string }) {
  return (
    <div className="rounded-lg border border-gray-700 overflow-hidden">
      <img src={url} alt="Ticket proof" className="w-full object-contain max-h-64" />
    </div>
  )
}
'@

# Event Components
CreateFile 'components/events/EventCard.tsx' @'
import { Event } from "@/types"
import Link from "next/link"
import { formatEventDate } from "@/utils/formatDate"
import { generateSlug } from "@/utils/generateSlug"

export default function EventCard({ event }: { event: Event }) {
  const slug = generateSlug(event.artist, event.city, event.event_date)
  return (
    <Link href={`/event/${slug}`} className="block rounded-xl border border-gray-800 bg-gray-900 p-4 hover:border-brand-500 transition-colors">
      <h3 className="font-semibold">{event.artist}</h3>
      <p className="text-sm text-gray-400">{event.venue}, {event.city}</p>
      <p className="text-sm text-gray-500">{formatEventDate(event.event_date)}</p>
    </Link>
  )
}
'@

CreateFile 'components/events/EventBanner.tsx' @'
import { Event } from "@/types"
import { formatEventDate } from "@/utils/formatDate"

export default function EventBanner({ event }: { event: Event }) {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gray-800">
      {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-full object-cover opacity-60" />}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h1 className="text-3xl font-bold text-white">{event.artist}</h1>
        <p className="text-gray-300">{event.venue} · {event.city}</p>
        <p className="text-gray-400 text-sm">{formatEventDate(event.event_date)}</p>
      </div>
    </div>
  )
}
'@

CreateFile 'components/events/EventListings.tsx' @'
import { Ticket } from "@/types"
import TicketListingCard from "@/components/tickets/TicketListingCard"

export default function EventListings({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Available Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-400">No tickets available for this event.</p>
      ) : (
        tickets.map(ticket => <TicketListingCard key={ticket.id} ticket={ticket} />)
      )}
    </div>
  )
}
'@

CreateFile 'components/events/SeatMap.tsx' @'
export default function SeatMap() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
      <h3 className="font-semibold mb-2">Seat Map</h3>
      <div className="h-48 flex items-center justify-center text-gray-500">Seat map coming soon</div>
    </div>
  )
}
'@

# Search Components
CreateFile 'components/search/SearchBar.tsx' @'
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
'@

CreateFile 'components/search/SearchFilters.tsx' @'
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
'@

CreateFile 'components/search/SearchResults.tsx' @'
import { Ticket } from "@/types"
import TicketListingCard from "@/components/tickets/TicketListingCard"
import Spinner from "@/components/ui/Spinner"

export default function SearchResults({ tickets, loading }: { tickets: Ticket[]; loading: boolean }) {
  if (loading) return <div className="flex justify-center py-8"><Spinner /></div>
  return (
    <div className="space-y-3">
      {tickets.map(ticket => <TicketListingCard key={ticket.id} ticket={ticket} />)}
    </div>
  )
}
'@

# Home Components
CreateFile 'components/home/Hero.tsx' @'
import Link from "next/link"
import Button from "@/components/ui/Button"

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold text-white mb-4">Buy & Sell Tickets <span className="text-brand-500">Safely</span></h1>
      <p className="text-xl text-gray-400 mb-8">Fan-to-fan ticket marketplace with verified sellers and secure payments.</p>
      <div className="flex justify-center gap-4">
        <Link href="/search"><Button size="lg">Browse Tickets</Button></Link>
        <Link href="/sell"><Button size="lg" variant="outline">Sell Tickets</Button></Link>
      </div>
    </section>
  )
}
'@

CreateFile 'components/home/TrendingEvents.tsx' @'
export default function TrendingEvents() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Trending Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-gray-400">Loading events...</div>
      </div>
    </section>
  )
}
'@

CreateFile 'components/home/FeaturedArtists.tsx' @'
export default function FeaturedArtists() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Artists</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <div className="rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-400 whitespace-nowrap">Loading...</div>
      </div>
    </section>
  )
}
'@

CreateFile 'components/home/RecentListings.tsx' @'
export default function RecentListings() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Recent Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-gray-400">No listings yet.</div>
      </div>
    </section>
  )
}
'@

# Seller Components
CreateFile 'components/seller/SellerCard.tsx' @'
import { User } from "@/types"
import Avatar from "@/components/ui/Avatar"
import StarRating from "@/components/ui/StarRating"
import VerifiedBadge from "@/components/ui/VerifiedBadge"

export default function SellerCard({ seller }: { seller: User }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4">
      <Avatar src={seller.avatar_url} alt={seller.username} />
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{seller.username}</span>
          {seller.verified && <VerifiedBadge />}
        </div>
        <StarRating rating={seller.rating} />
        <p className="text-xs text-gray-500">{seller.successful_sales} sales</p>
      </div>
    </div>
  )
}
'@

CreateFile 'components/seller/SellerStats.tsx' @'
interface SellerStatsProps {
  totalSales: number
  totalRevenue: number
  rating: number
}

export default function SellerStats({ totalSales, totalRevenue, rating }: SellerStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center">
        <p className="text-2xl font-bold text-brand-400">{totalSales}</p>
        <p className="text-sm text-gray-400">Sales</p>
      </div>
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center">
        <p className="text-2xl font-bold text-brand-400">€{totalRevenue}</p>
        <p className="text-sm text-gray-400">Revenue</p>
      </div>
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center">
        <p className="text-2xl font-bold text-brand-400">{rating.toFixed(1)}</p>
        <p className="text-sm text-gray-400">Rating</p>
      </div>
    </div>
  )
}
'@

CreateFile 'components/seller/ListingForm.tsx' @'
"use client"
export default function ListingForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Listing</h2>
      <p className="text-gray-400">Listing form coming soon.</p>
    </div>
  )
}
'@

# Admin Components
CreateFile 'components/admin/FraudQueue.tsx' @'
export default function FraudQueue() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Fraud Queue</h2>
      <p className="text-gray-400">No flagged items.</p>
    </div>
  )
}
'@

CreateFile 'components/admin/UserTable.tsx' @'
import { User } from "@/types"

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-gray-800"><th className="py-2 text-left text-gray-400">Username</th><th className="py-2 text-left text-gray-400">Verified</th><th className="py-2 text-left text-gray-400">Sales</th></tr></thead>
        <tbody>{users.map(u => <tr key={u.id} className="border-b border-gray-800"><td className="py-2">{u.username}</td><td className="py-2">{u.verified ? "Yes" : "No"}</td><td className="py-2">{u.successful_sales}</td></tr>)}</tbody>
      </table>
    </div>
  )
}
'@

CreateFile 'components/admin/OrderTable.tsx' @'
import { Order } from "@/types"

export default function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-gray-800"><th className="py-2 text-left text-gray-400">Order ID</th><th className="py-2 text-left text-gray-400">Status</th><th className="py-2 text-left text-gray-400">Total</th></tr></thead>
        <tbody>{orders.map(o => <tr key={o.id} className="border-b border-gray-800"><td className="py-2">{o.id.slice(0, 8)}</td><td className="py-2">{o.status}</td><td className="py-2">€{o.total}</td></tr>)}</tbody>
      </table>
    </div>
  )
}
'@

Write-Host "All components created successfully"
