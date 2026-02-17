"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Studio } from "@/types";
import { StudioCard } from "@/components/StudioCard";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState("");

  const { data: studiosData, isLoading } = useQuery({
    queryKey: ["studios-home"],
    queryFn: async () => {
      const res = await fetch("/api/studios");
      return res.json() as Promise<{ studios: Studio[]; total: number }>;
    },
  });

  const featuredStudios = studiosData?.studios.filter((s) => s.featured) || [];
  const popularStudios = studiosData?.studios.filter((s) => s.popular) || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchLocation)}`);
  };

  const FeaturedSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-[350px] rounded-3xl bg-card border border-surface-50/10 animate-pulse" />
      ))}
    </div>
  );

  const GridSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-[250px] rounded-2xl bg-card border border-surface-50/10 animate-pulse" />
      ))}
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in shadow-glow">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-sm text-accent font-medium">Over 500+ studios across the UK</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 animate-slide-up">
            <span className="text-gradient">Explore</span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Find your sound
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-card border border-surface-50/50 shadow-card">
              <div className="flex-1 flex items-center gap-3 px-4">
                <svg className="w-5 h-5 text-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by city, area, or studio name..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full py-3 bg-transparent outline-none text-white placeholder:text-muted text-sm"
                />
              </div>
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-accent text-white font-semibold text-sm hover:opacity-90 transition-all hover:shadow-glow active:scale-95">
                Search
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 mt-4 text-sm text-muted">
              <span>Popular:</span>
              {["London", "Manchester", "Glasgow"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSearchLocation(city);
                    router.push(`/search?q=${city}`);
                  }}
                  className="px-3 py-1 rounded-full bg-surface-50 hover:bg-accent/20 hover:text-accent transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Featured Studios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold italic tracking-tight">Featured Studios</h2>
            <p className="text-muted text-sm mt-1">Hand-picked studios with exceptional quality</p>
          </div>
          <Link href="/search" className="text-accent text-sm font-medium hover:underline flex items-center gap-1 group">
            View all
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <FeaturedSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredStudios.map((studio) => (<StudioCard key={studio.id} studio={studio} />))}
          </div>
        )}
      </section>

      {/* Popular Near You */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Popular Near You</h2>
          <p className="text-muted text-sm mt-1">Trending studios in your area</p>
        </div>

        {isLoading ? (
          <GridSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularStudios.map((studio) => (<StudioCard key={studio.id} studio={studio} variant="compact" />))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-lighter/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 italic">How It Works</h2>
          <p className="text-muted text-center mb-16 max-w-lg mx-auto">Book your perfect recording session in three simple steps</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🎙️", title: "Discover", description: "Browse hundreds of studios filtered by location, equipment, price, and specialist genre." },
              { icon: "📅", title: "Book", description: "Select your dates, session times, and number of artists. Instant confirmation available." },
              { icon: "🎧", title: "Create", description: "Show up with your talent. The studio handles the rest — gear, acoustics, and vibes." }
            ].map((step, i) => (
              <div key={i} className="relative group text-center p-10 rounded-3xl bg-card border border-surface-50/30 hover:border-accent/30 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold shadow-glow">{i + 1}</div>
                <div className="text-4xl mb-6">{step.icon}</div>
                <h3 className="font-bold text-xl mb-3 tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-gradient-accent p-16 text-center shadow-accent-glow">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Own a Recording Studio?</h2>
            <p className="text-white/90 text-xl mb-10 max-w-xl mx-auto font-light">List your space on Booth and connect with thousands of artists looking for the perfect studio.</p>
            <button className="px-10 py-4 rounded-xl bg-white text-accent font-bold hover:bg-white/90 transition-all active:scale-95 shadow-2xl">List Your Studio</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
