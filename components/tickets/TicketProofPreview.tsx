export default function TicketProofPreview({ url }: { url: string }) {
  return (
    <div className="rounded-lg border border-gray-700 overflow-hidden">
      <img src={url} alt="Ticket proof" className="w-full object-contain max-h-64" />
    </div>
  )
}