"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2",
        "text-xs font-semibold uppercase tracking-wider",
        "rounded-full border",
        "bg-[var(--accent-dim)] text-[var(--accent)] border-[var(--accent)]/20",
        variant === "success" && "bg-[var(--energy)]/10 text-[var(--energy)] border-[var(--energy)]/20",
        variant === "warning" && "bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20",
        className
      )}
    >
      {children}
    </span>
  );
}
