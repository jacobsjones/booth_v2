import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Booth — Recording Studio Marketplace",
  description:
    "Find and book the perfect recording studio. Booth connects artists with world-class studios across the UK.",
  keywords: [
    "recording studio",
    "music studio",
    "booking",
    "marketplace",
    "UK",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-background text-text-primary">
        <Providers>
          <Navbar />
          <main className="lg:pt-20 pb-24 lg:pb-0">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
