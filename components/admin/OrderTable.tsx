import { Order } from "@/types"

export default function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-gray-800"><th className="py-2 text-left text-gray-400">Order ID</th><th className="py-2 text-left text-gray-400">Status</th><th className="py-2 text-left text-gray-400">Total</th></tr></thead>
        <tbody>{orders.map(o => <tr key={o.id} className="border-b border-gray-800"><td className="py-2">{o.id.slice(0, 8)}</td><td className="py-2">{o.status}</td><td className="py-2">â‚¬{o.total}</td></tr>)}</tbody>
      </table>
    </div>
  )
}