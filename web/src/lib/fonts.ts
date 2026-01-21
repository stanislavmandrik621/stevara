import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";

// DM Serif Display - Premium editorial serif for headlines
// High-impact, elegant headlines like Tesla & premium brands
export const dmSerif = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: ["400"],
});

// Inter - Modern, clean sans-serif for body text
// Excellent readability, professional feel
export const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

// Legacy exports for compatibility
export const playfair = dmSerif;
export const sourceSerif = inter;
