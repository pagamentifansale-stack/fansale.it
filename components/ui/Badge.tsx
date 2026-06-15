import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "purple"
    | "brand";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  dot,
}: BadgeProps) {
  const variants = {
    default: "bg-gray-800 text-gray-300",
    success: "bg-emerald-500/20 text-emerald-400",
    warning: "bg-amber-500/20 text-amber-400",
    danger: "bg-red-500/20 text-red-400",
    info: "bg-blue-500/20 text-blue-400",
    purple: "bg-purple-500/20 text-purple-400",
    brand: "bg-rose-500/20 text-rose-400",
  };

  const dotColors = {
    default: "bg-gray-400",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    danger: "bg-red-400",
    info: "bg-blue-400",
    purple: "bg-purple-400",
    brand: "bg-rose-400",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotColors[variant],
          )}
        />
      )}
      {children}
    </span>
  );
}
