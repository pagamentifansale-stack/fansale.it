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