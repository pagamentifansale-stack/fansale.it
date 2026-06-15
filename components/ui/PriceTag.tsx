import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  currency?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
  originalPrice?: number;
  highlight?: boolean;
}

export default function PriceTag({
  price,
  currency = "EUR",
  size = "md",
  className,
  label,
  originalPrice,
  highlight = false,
}: PriceTagProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const originalSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  return (
    <div className={cn("flex flex-col items-end", className)}>
      {label && <span className="text-xs text-gray-500 mb-0.5">{label}</span>}
      <div className="flex items-baseline gap-2">
        {originalPrice && originalPrice > price && (
          <span
            className={cn("text-gray-600 line-through", originalSizes[size])}
          >
            {formatCurrency(originalPrice, currency)}
          </span>
        )}
        <span
          className={cn(
            "font-bold",
            sizes[size],
            highlight ? "text-rose-400" : "text-white",
          )}
        >
          {formatCurrency(price, currency)}
        </span>
      </div>
    </div>
  );
}
