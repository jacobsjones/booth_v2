"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Studio } from "@/types";
import { StudioCard } from "@/components/StudioCard";
import dynamic from "next/dynamic";

const SearchMap = dynamic(() => import("@/components/SearchMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-surface/50 flex items-center justify-center">
            <div className="text-muted text-sm">Loading markers...</div>
        </div>
    ),
});

const FILTER_CATEGORIES = [
    { label: "All Studios", value: "" },
    { label: "Recording", value: "recording" },
    { label: "Mixing", value: "mixing" },
    { label: "Mastering", value: "mastering" },
    { label: "Podcast", value: "podcast" },
    { label: "Budget Friendly", value: "budget" },
    { label: "Top Rated", value: "top-rated" },
];

export default function SearchClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("");
    const [hoveredStudioId, setHoveredStudioId] = useState<string | null>(null);
    const [selectedStudioId, setSelectedStudioId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [mobileView, setMobileView] = useState<"list" | "map">("list");

    const query = searchParams.get("q") || "";

    const { data, isLoading } = useQuery({
        queryKey: ["studios-search", query],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (query) params.set("q", query);
            const res = await fetch(`/api/studios?${params}`);
            return res.json() as Promise<{ studios: Studio[]; total: number }>;
        },
    });

    const filteredStudios = (() => {
        let studios = data?.studios || [];
        if (activeFilter === "budget") {
            studios = studios.filter((s) => s.pricePerHour <= 80);
        } else if (activeFilter === "top-rated") {
            studios = studios.filter((s) => s.rating >= 4.8);
        } else if (activeFilter) {
            const cat = activeFilter.toLowerCase();
            studios = studios.filter((s) =>
                s.equipment.some((e) => e.category.toLowerCase().includes(cat) || e.name.toLowerCase().includes(cat)) ||
                s.amenities.some((a) => a.toLowerCase().includes(cat))
            );
        }
        return studios;
    })();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    const scrollToStudio = useCallback((studioId: string) => {
        setSelectedStudioId(studioId);
        setMobileView("list");
        setTimeout(() => {
            const el = document.getElementById(`studio-card-${studioId}`);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 100);
    }, []);

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-surface">
            {/* Top Search Bar */}
            <div className="bg-surface border-b border-surface-50/30 px-4 py-3 sticky top-0 z-30">
                <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex gap-2">
                    <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card border border-surface-50/50 shadow-inner group focus-within:border-accent/40 transition-colors">
                        <svg className="w-4 h-4 text-muted group-focus-within:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input
                            type="text"
                            placeholder="Where is your next session?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent outline-none text-white placeholder:text-muted text-sm"
                        />
                    </div>
                    <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:opacity-90 transition-all shadow-glow">Search</button>
                </form>
            </div>

            <div className="flex-1 flex relative overflow-hidden">
                {/* Listings Panel */}
                <div className={`w-full lg:w-[480px] xl:w-[520px] flex flex-col border-r border-surface-50/20 bg-surface z-10 transition-transform duration-300 ${mobileView === "map" ? "hidden lg:flex" : "flex"}`}>
                    <div className="px-4 py-4 border-b border-surface-50/10 flex-shrink-0">
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                            {FILTER_CATEGORIES.map((filter) => (
                                <button
                                    key={filter.value}
                                    onClick={() => setActiveFilter(filter.value)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeFilter === filter.value ? "bg-accent text-white shadow-glow" : "bg-card text-muted-foreground hover:text-white border border-surface-50/30"}`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-muted text-xs font-medium">
                                Showing <span className="text-white font-bold">{filteredStudios.length}</span> studios {query && (<span>in <span className="text-accent underline underline-offset-4 decoration-accent/30">{query}</span></span>)}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-surface/30">
                        {isLoading ? (
                            <>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-card border border-surface-50/10 animate-pulse">
                                        <div className="w-32 h-28 rounded-xl bg-surface-50 flex-shrink-0" />
                                        <div className="flex-1 space-y-3 py-1">
                                            <div className="h-4 bg-surface-50 rounded w-3/4" />
                                            <div className="h-3 bg-surface-50 rounded w-1/2" />
                                            <div className="h-3 bg-surface-50 rounded w-1/4" />
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : filteredStudios.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-60">
                                <div className="text-5xl mb-4">🔍</div>
                                <p className="font-bold text-lg">No results found</p>
                                <p className="text-muted text-sm mt-1">Try a different location or filter</p>
                            </div>
                        ) : (
                            filteredStudios.map((studio) => (
                                <div key={studio.id} id={`studio-card-${studio.id}`} className="transform transition-all active:scale-[0.98]">
                                    <StudioCard
                                        studio={studio}
                                        variant="horizontal"
                                        onHover={setHoveredStudioId}
                                        isHighlighted={hoveredStudioId === studio.id || selectedStudioId === studio.id}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Map View */}
                <div className={`flex-1 relative ${mobileView === "list" ? "hidden lg:flex" : "flex"}`}>
                    <SearchMap
                        studios={filteredStudios}
                        hoveredStudioId={hoveredStudioId}
                        onMarkerHover={setHoveredStudioId}
                        onMarkerClick={scrollToStudio}
                    />

                    {/* Mobile Toggle Button (Floating) */}
                    <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                        <button
                            onClick={() => setMobileView(mobileView === "list" ? "map" : "list")}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-900 text-white font-bold text-sm shadow-xl border border-white/10 glass"
                        >
                            {mobileView === "list" ? (
                                <><span className="text-xl">🗺️</span> Map View</>
                            ) : (
                                <><span className="text-xl">📋</span> List View</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
