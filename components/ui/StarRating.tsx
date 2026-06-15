import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  className?: string;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 14,
  showValue = true,
  showCount = false,
  count,
  className,
  interactive = false,
  onRate,
}: StarRatingProps) {
  const clampedRating = Math.max(0, Math.min(rating, maxRating));

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < Math.floor(clampedRating);
        const partial = !filled && i < clampedRating;

        return (
          <button
            key={i}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRate ? () => onRate(i + 1) : undefined}
            className={cn(
              "shrink-0",
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform"
                : "cursor-default pointer-events-none",
            )}
            aria-label={
              interactive
                ? `Rate ${i + 1} star${i !== 0 ? "s" : ""}`
                : undefined
            }
          >
            <Star
              size={size}
              className={cn(
                filled
                  ? "fill-amber-400 text-amber-400"
                  : partial
                    ? "fill-amber-400/50 text-amber-400/50"
                    : "fill-gray-700 text-gray-700",
              )}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="text-sm text-gray-400 ml-0.5 tabular-nums">
          {clampedRating.toFixed(1)}
        </span>
      )}
      {showCount && count !== undefined && (
        <span className="text-sm text-gray-500">({count})</span>
      )}
    </div>
  );
}
