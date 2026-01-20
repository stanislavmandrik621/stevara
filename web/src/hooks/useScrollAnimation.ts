"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start || "top 85%",
              toggleActions: options.toggleActions || "play none none reverse",
            },
          }
        );
      });

      // Reveal left
      gsap.utils.toArray<HTMLElement>(".reveal-left").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start || "top 85%",
              toggleActions: options.toggleActions || "play none none reverse",
            },
          }
        );
      });

      // Reveal right
      gsap.utils.toArray<HTMLElement>(".reveal-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start || "top 85%",
              toggleActions: options.toggleActions || "play none none reverse",
            },
          }
        );
      });

      // Reveal scale
      gsap.utils.toArray<HTMLElement>(".reveal-scale").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start || "top 85%",
              toggleActions: options.toggleActions || "play none none reverse",
            },
          }
        );
      });

      // Stagger children
      gsap.utils.toArray<HTMLElement>(".stagger-children").forEach((el) => {
        const children = el.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: options.start || "top 85%",
              toggleActions: options.toggleActions || "play none none reverse",
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [options.start, options.toggleActions]);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
