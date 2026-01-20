"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, className, children, ...props }, ref) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
      // Variants
      variant === "primary" && "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90",
      variant === "secondary" && "bg-transparent text-[var(--foreground)] border border-[var(--glass-border)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
      variant === "ghost" && "bg-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)]",
      // Sizes
      size === "sm" && "px-4 py-2 text-xs",
      size === "md" && "px-6 py-3 text-sm",
      size === "lg" && "px-8 py-4 text-base",
      className
    );

    if (href) {
      return (
        <Link href={href} className={baseStyles}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={baseStyles}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
