import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function VerifiedBadge({
  className,
  showLabel = true,
  size = "sm",
}: VerifiedBadgeProps) {
  const iconSize = size === "sm" ? 14 : 16;
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-emerald-400",
        className,
      )}
      title="Verified seller"
    >
      <ShieldCheck
        size={iconSize}
        className="shrink-0"
        style={{ fill: "rgba(52,211,153,0.15)" }}
      />
      {showLabel && (
        <span className={cn("font-medium", textSize)}>Verified</span>
      )}
    </div>
  );
}
