import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
  as?: "div" | "article" | "section";
}

export default function Card({
  children,
  className,
  hover,
  padding = "md",
  onClick,
  as: Tag = "div",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <Tag
      onClick={onClick}
      className={cn(
        "bg-gray-900 border border-gray-800 rounded-2xl",
        hover &&
          "hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer",
        paddings[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
