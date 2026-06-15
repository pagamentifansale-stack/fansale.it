"use client"
export default function TicketUploadForm() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Ticket Proof</h2>
      <input type="file" accept="image/*,.pdf" className="block w-full text-sm text-gray-400" />
    </div>
  )
}