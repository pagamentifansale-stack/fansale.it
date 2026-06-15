import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        variant === "primary" && "bg-brand-500 text-white hover:bg-brand-600",
        variant === "secondary" && "bg-gray-800 text-white hover:bg-gray-700",
        variant === "outline" &&
          "border border-gray-600 text-gray-200 hover:bg-gray-800",
        variant === "ghost" &&
          "text-gray-400 hover:text-white hover:bg-gray-800",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
