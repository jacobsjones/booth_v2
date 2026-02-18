"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Studio } from "@/types";
import { StudioCard } from "@/components/StudioCard";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState("");
  const [activeTab, setActiveTab] = useState("All Spaces");

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

  const TABS = ["All Spaces", "Home Studios", "Professional", "Recording"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-12">
      {/* Header Area */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-1">
            EXPLORE
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white italic">
            Find your sound
          </h1>
        </div>
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </header>

      {/* Search & Filter Header */}
      <div className="flex gap-3 mb-10">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
          <input
            type="text"
            placeholder="Search studios, equipment..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full bg-[#121220] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm text-white placeholder:text-text-muted focus:ring-1 focus:ring-accent outline-none transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
        </form>
        <button className="w-14 h-14 rounded-2xl bg-[#0f0f18]/80 border border-accent/30 flex items-center justify-center text-accent shadow-glow transition-all active:scale-95">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        </button>
      </div>

      {/* Featured Studios Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">Featured Studios</h2>
          <Link href="/search" className="text-accent text-sm font-bold hover:underline">
            View all
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
          {isLoading ? (
            [...Array(2)].map((_, i) => (
              <div key={i} className="w-[300px] h-[350px] rounded-[2rem] bg-surface-lighter/50 animate-pulse flex-shrink-0" />
            ))
          ) : (
            featuredStudios.map((studio) => (
              <div key={studio.id} className="snap-start">
                <StudioCard studio={studio} variant="featured-main" />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Tabs Filter */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${activeTab === tab
                ? "bg-accent text-white border-accent shadow-glow"
                : "bg-[#0f0f18] text-text-muted border-white/5 hover:border-white/10"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Popular Near You Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">Popular Near You</h2>
          <div className="flex items-center gap-1.5 text-text-muted text-xs font-medium">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>Los Angeles, CA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-surface-lighter/50 animate-pulse" />
            ))
          ) : (
            popularStudios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} variant="grid-item" />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
