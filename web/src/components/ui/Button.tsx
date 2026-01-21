"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  showArrow?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, icon, showArrow = false, className, children, ...props }, ref) => {
    
    // Accent variant - yellow button with arrow circle
    if (variant === "accent") {
      const content = (
        <>
          {icon && <span className="text-[#1d1d1f]">{icon}</span>}
          <span className="font-medium text-[15px] text-[#1d1d1f]">{children}</span>
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1d1d1f] flex-shrink-0">
            <ArrowRight className="w-[18px] h-[18px] text-white -rotate-45" />
          </span>
        </>
      );

      const accentStyles = cn(
        "inline-flex items-center gap-4 pl-7 pr-1.5 py-1.5 rounded-full bg-[var(--brand-yellow)] transition-all duration-300 hover:brightness-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2",
        className
      );

      if (href) {
        return <Link href={href} className={accentStyles}>{content}</Link>;
      }
      return <button ref={ref} className={accentStyles} {...props}>{content}</button>;
    }

    // Standard variants
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
      // Variants
      variant === "primary" && "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90",
      variant === "secondary" && "bg-transparent text-[var(--foreground)] border border-[var(--glass-border)] hover:border-[var(--foreground)] hover:bg-[var(--accent-dim)]",
      variant === "ghost" && "bg-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)]",
      // Sizes
      size === "sm" && "px-5 py-2.5 text-sm",
      size === "md" && "px-6 py-3 text-[15px]",
      size === "lg" && "px-8 py-4 text-base",
      className
    );

    const content = (
      <>
        {icon && <span>{icon}</span>}
        {children}
        {showArrow && <ArrowRight className="w-4 h-4 -rotate-45" />}
      </>
    );

    if (href) {
      return <Link href={href} className={baseStyles}>{content}</Link>;
    }

    return (
      <button ref={ref} className={baseStyles} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
