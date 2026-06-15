$base = 'C:\Users\user\Desktop\fanswap'

function CF($path, $content) {
    $fullPath = Join-Path $base $path
    $dir = Split-Path $fullPath -Parent
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.Encoding]::UTF8)
}

CF 'app\(auth)\login\page.tsx' @'
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <h1 className="text-2xl font-bold text-white">Login</h1>
    </main>
  )
}
'@

CF 'app\(auth)\signup\page.tsx' @'
export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <h1 className="text-2xl font-bold text-white">Sign Up</h1>
    </main>
  )
}
'@

CF 'app\(main)\layout.tsx' @'
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-950 text-white">{children}</div>
}
'@

CF 'app\(main)\page.tsx' @'
export default function MainPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Home</h1>
    </main>
  )
}
'@

CF 'app\(main)\search\page.tsx' @'
export default function SearchPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Search</h1>
    </main>
  )
}
'@

CF 'app\(main)\event\[slug]\page.tsx' @'
export default function EventPage({ params }: { params: { slug: string } }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Event: {params.slug}</h1>
    </main>
  )
}
'@

CF 'app\(main)\ticket\[ticketId]\page.tsx' @'
export default function TicketPage({ params }: { params: { ticketId: string } }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Ticket: {params.ticketId}</h1>
    </main>
  )
}
'@

CF 'app\(main)\checkout\[ticketId]\page.tsx' @'
export default function CheckoutPage({ params }: { params: { ticketId: string } }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Checkout: {params.ticketId}</h1>
    </main>
  )
}
'@

CF 'app\(main)\checkout\[ticketId]\steps\AccountStep.tsx' @'
export default function AccountStep() {
  return <div><h2 className="text-xl font-semibold">Account Step</h2></div>
}
'@

CF 'app\(main)\checkout\[ticketId]\steps\BuyerInfoStep.tsx' @'
export default function BuyerInfoStep() {
  return <div><h2 className="text-xl font-semibold">Buyer Info Step</h2></div>
}
'@

CF 'app\(main)\checkout\[ticketId]\steps\DeliveryStep.tsx' @'
export default function DeliveryStep() {
  return <div><h2 className="text-xl font-semibold">Delivery Step</h2></div>
}
'@

CF 'app\(main)\checkout\[ticketId]\steps\PaymentStep.tsx' @'
export default function PaymentStep() {
  return <div><h2 className="text-xl font-semibold">Payment Step</h2></div>
}
'@

CF 'app\(main)\checkout\[ticketId]\steps\ConfirmationStep.tsx' @'
export default function ConfirmationStep() {
  return <div><h2 className="text-xl font-semibold">Confirmation Step</h2></div>
}
'@

CF 'app\(main)\sell\page.tsx' @'
export default function SellPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Sell Tickets</h1>
    </main>
  )
}
'@

CF 'app\(main)\sell\upload\page.tsx' @'
export default function SellUploadPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Upload Ticket</h1>
    </main>
  )
}
'@

CF 'app\(main)\sell\review\page.tsx' @'
export default function SellReviewPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Review Listing</h1>
    </main>
  )
}
'@

CF 'app\(main)\sell\success\page.tsx' @'
export default function SellSuccessPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Listing Published!</h1>
    </main>
  )
}
'@

CF 'app\(main)\dashboard\seller\page.tsx' @'
export default function SellerDashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>
    </main>
  )
}
'@

CF 'app\(main)\dashboard\seller\listings\page.tsx' @'
export default function SellerListingsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">My Listings</h1>
    </main>
  )
}
'@

CF 'app\(main)\dashboard\seller\orders\page.tsx' @'
export default function SellerOrdersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Seller Orders</h1>
    </main>
  )
}
'@

CF 'app\(main)\dashboard\seller\payouts\page.tsx' @'
export default function SellerPayoutsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Payouts</h1>
    </main>
  )
}
'@

CF 'app\(main)\dashboard\buyer\page.tsx' @'
export default function BuyerDashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
    </main>
  )
}
'@

CF 'app\(main)\dashboard\buyer\orders\page.tsx' @'
export default function BuyerOrdersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">My Orders</h1>
    </main>
  )
}
'@

CF 'app\(main)\dashboard\buyer\tickets\page.tsx' @'
export default function BuyerTicketsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">My Tickets</h1>
    </main>
  )
}
'@

CF 'app\(main)\admin\page.tsx' @'
export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    </main>
  )
}
'@

CF 'app\(main)\admin\fraud\page.tsx' @'
export default function AdminFraudPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Fraud Queue</h1>
    </main>
  )
}
'@

CF 'app\(main)\admin\users\page.tsx' @'
export default function AdminUsersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Users</h1>
    </main>
  )
}
'@

CF 'app\(main)\admin\orders\page.tsx' @'
export default function AdminOrdersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Orders</h1>
    </main>
  )
}
'@

CF 'app\(main)\admin\listings\page.tsx' @'
export default function AdminListingsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Listings</h1>
    </main>
  )
}
'@

CF 'app\help\page.tsx' @'
export default function HelpPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Help Center</h1>
    </main>
  )
}
'@

CF 'app\terms\page.tsx' @'
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
    </main>
  )
}
'@

CF 'app\privacy\page.tsx' @'
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
    </main>
  )
}
'@

CF 'app\api\create-checkout\route.ts' @'
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ sessionId: null, body })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
'@

CF 'app\api\webhook\route.ts' @'
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    return NextResponse.json({ received: true, body })
  } catch {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }
}
'@

CF 'app\api\lock-ticket\route.ts' @'
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ locked: true, ticketId: body.ticketId })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
'@

CF 'app\api\ocr-scan\route.ts' @'
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ text: "", confidence: 0, imageUrl: body.imageUrl })
  } catch {
    return NextResponse.json({ error: "OCR scan failed" }, { status: 500 })
  }
}
'@

Write-Host "All app routes and API routes created successfully"
