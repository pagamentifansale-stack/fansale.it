import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export default function Spinner({
  size = "md",
  className,
  label,
}: SpinnerProps) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-[3px]",
  };

  return (
    <div
      role="status"
      aria-label={label || "Loading"}
      className={cn("flex items-center justify-center", className)}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-gray-700 border-t-rose-500",
          sizes[size],
        )}
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
