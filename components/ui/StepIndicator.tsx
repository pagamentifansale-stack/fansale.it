import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { CheckoutStep } from "@/types";

interface StepIndicatorProps {
  steps: CheckoutStep[];
  className?: string;
}

export default function StepIndicator({
  steps,
  className,
}: StepIndicatorProps) {
  return (
    <div
      className={cn("flex items-center", className)}
      role="list"
      aria-label="Progress"
    >
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center" role="listitem">
          {/* Step circle + label */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                step.completed
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                  : step.active
                    ? "bg-rose-500/20 border-2 border-rose-500 text-rose-400"
                    : "bg-gray-800 border border-gray-700 text-gray-500",
              )}
              aria-current={step.active ? "step" : undefined}
            >
              {step.completed ? (
                <Check size={14} strokeWidth={2.5} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={cn(
                "mt-1.5 text-xs font-medium hidden sm:block whitespace-nowrap",
                step.active
                  ? "text-rose-400"
                  : step.completed
                    ? "text-gray-400"
                    : "text-gray-600",
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-px w-10 sm:w-16 mx-1.5 mb-4 sm:mb-5 transition-all duration-500",
                step.completed ? "bg-rose-500" : "bg-gray-800",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
