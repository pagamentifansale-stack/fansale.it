import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  fallback?: string;
  online?: boolean;
}

export default function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  className,
  fallback,
  online,
}: AvatarProps) {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const dotSizes = {
    xs: "w-1.5 h-1.5 border",
    sm: "w-2 h-2 border",
    md: "w-2.5 h-2.5 border-2",
    lg: "w-3 h-3 border-2",
    xl: "w-4 h-4 border-2",
  };

  // Generate initials from fallback string (up to 2 chars)
  const initials = fallback
    ? fallback
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "relative rounded-full overflow-hidden bg-gray-800 flex items-center justify-center font-semibold text-gray-400",
          sizes[size],
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-gray-950",
            online ? "bg-emerald-400" : "bg-gray-600",
            dotSizes[size],
          )}
        />
      )}
    </div>
  );
}
