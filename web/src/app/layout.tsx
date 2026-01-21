import type { Metadata } from "next";
import { dmSerif, inter, jetbrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "STEVARA - Official Tesla Energy Systems",
    template: "%s | STEVARA",
  },
  description:
    "STEVARA delivers Tesla Powerwall and Megapack systems for homes, businesses, and infrastructure. Official supply with full engineering support.",
  keywords: [
    "Tesla Powerwall",
    "Tesla Megapack",
    "energy storage",
    "battery systems",
    "solar energy",
    "STEVARA",
  ],
  authors: [{ name: "STEVARA" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "STEVARA",
    title: "STEVARA - Official Tesla Energy Systems",
    description:
      "Tesla Powerwall and Megapack systems for homes, businesses, and infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
      >
          <Navbar />
        {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
