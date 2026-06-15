"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  onIconRightClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      icon: Icon,
      iconRight: IconRight,
      onIconRightClick,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Icon size={16} />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              Icon && "pl-10",
              IconRight && "pr-10",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            {...props}
          />
          {IconRight && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                onIconRightClick &&
                  "cursor-pointer hover:text-gray-200 transition-colors",
              )}
              onClick={onIconRightClick}
            >
              <IconRight size={16} />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
