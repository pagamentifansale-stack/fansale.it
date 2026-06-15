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
        <p className="text-2xl font-bold text-brand-400">â‚¬{totalRevenue}</p>
        <p className="text-sm text-gray-400">Revenue</p>
      </div>
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center">
        <p className="text-2xl font-bold text-brand-400">{rating.toFixed(1)}</p>
        <p className="text-sm text-gray-400">Rating</p>
      </div>
    </div>
  )
}