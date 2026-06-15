"use client";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface CountdownProps {
  targetDate: string;
  onExpire?: () => void;
  className?: string;
  label?: string;
  showIcon?: boolean;
}

export default function Countdown({
  targetDate,
  onExpire,
  className,
  label = "Reserved for",
  showIcon = true,
}: CountdownProps) {
  const { minutes, seconds, expired } = useCountdown(targetDate);

  if (expired) {
    // Call onExpire in a safe way (not during render)
    if (typeof onExpire === "function") {
      setTimeout(onExpire, 0);
    }
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-red-400 text-sm font-medium",
          className,
        )}
      >
        {showIcon && <Clock size={14} className="shrink-0" />}
        <span>Reservation expired</span>
      </div>
    );
  }

  const isUrgent = minutes === 0 && seconds <= 30;

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors",
        isUrgent ? "text-red-400" : "text-amber-400",
        className,
      )}
    >
      {showIcon && <Clock size={14} className="shrink-0" />}
      <span>
        {label}{" "}
        <span
          className={cn("font-mono tabular-nums", isUrgent && "animate-pulse")}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </span>
    </div>
  );
}
