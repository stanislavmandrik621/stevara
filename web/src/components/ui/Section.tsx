"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  dark?: boolean;
  grid?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, containerClassName, dark, grid, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          dark ? "bg-[var(--background-secondary)]" : "bg-[var(--background)]",
          className
        )}
        {...props}
      >
        {grid && (
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(var(--glass-border) 1px, transparent 1px), linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black, transparent)',
            }}
          />
        )}
        <div className={cn("container relative z-10", containerClassName)}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";
