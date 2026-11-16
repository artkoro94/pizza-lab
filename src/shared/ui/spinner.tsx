import type { HTMLAttributes } from "react";

type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "size-4 border-2",
  md: "size-6 border-[3px]",
  lg: "size-10 border-4",
};

export function Spinner({
  label = "Загрузка",
  size = "md",
  className = "",
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block animate-spin rounded-full border-current border-r-transparent motion-reduce:animate-none ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}
