"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useRef, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Studio } from "@/types";
import { StudioCard } from "@/components/StudioCard";
import dynamic from "next/dynamic";

const SearchMap = dynamic(() => import("@/components/SearchMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-[#050508] flex items-center justify-center">
            <div className="text-text-muted text-sm animate-pulse font-bold tracking-widest uppercase">Initializing Radar...</div>
        </div>
    ),
});

export default function SearchClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [hoveredStudioId, setHoveredStudioId] = useState<string | null>(null);
    const [mobileView, setMobileView] = useState<"list" | "map">("map");
    const [isMinimized, setIsMinimized] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

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

    const studiosList = useMemo(() => data?.studios || [], [data]);

    // Sync scroll with map center
    const handleCarouselScroll = () => {
        if (!carouselRef.current || isMinimized) return;
        const scrollLeft = carouselRef.current.scrollLeft;
        const cardWidth = 270; // 260 width + 10 gap approx
        const index = Math.round(scrollLeft / cardWidth);
        if (studiosList[index] && studiosList[index].id !== hoveredStudioId) {
            setHoveredStudioId(studiosList[index].id);
        }
    };

    const scrollToStudio = useCallback((studioId: string) => {
        setHoveredStudioId(studioId);
        if (isMinimized) setIsMinimized(false);

        const index = studiosList.findIndex(s => s.id === studioId);
        if (index !== -1 && carouselRef.current) {
            carouselRef.current.scrollTo({
                left: index * 270,
                behavior: 'smooth'
            });
        }
    }, [studiosList, isMinimized]);

    return (
        <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col overflow-hidden bg-background relative">
            {/* Search Header Overlay */}
            <div className="absolute top-4 left-4 right-4 z-40 pointer-events-none">
                <div className="max-w-xl mx-auto flex items-center gap-3 pointer-events-auto">
                    <div className="flex-1 bg-[#0f0f18]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-2 flex items-center shadow-2xl">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        <div className="flex-1 px-4 flex divide-x divide-white/10">
                            <div className="pr-4">
                                <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-0.5">LOCATION</p>
                                <p className="text-sm font-bold text-white whitespace-nowrap">Los Angeles, CA</p>
                            </div>
                            <div className="pl-4">
                                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-0.5">DATE</p>
                                <p className="text-sm font-bold text-white whitespace-nowrap">Oct 12</p>
                            </div>
                        </div>

                        <button className="w-12 h-12 rounded-2xl bg-[#181826] flex items-center justify-center text-accent border border-white/5">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Primary View Switcher */}
            {mobileView === "map" ? (
                <div className="flex-1 relative h-full">
                    <SearchMap
                        studios={studiosList}
                        hoveredStudioId={hoveredStudioId}
                        onMarkerHover={setHoveredStudioId}
                        onMarkerClick={scrollToStudio}
                    />

                    {/* Floating View Toggle */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                        <button
                            onClick={() => setMobileView('list')}
                            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent text-white font-bold text-sm shadow-accent-glow transform active:scale-95 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            List View
                        </button>
                    </div>

                    {/* Bottom Carousel Container */}
                    <div
                        className={`absolute bottom-6 left-0 right-0 z-30 transition-transform duration-500 ease-in-out ${isMinimized ? 'translate-y-[260px]' : 'translate-y-0'}`}
                    >
                        {/* Minimize Handle */}
                        <div className="max-w-xl mx-auto px-6 mb-2 flex justify-center">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="w-12 h-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"
                                aria-label={isMinimized ? "Maximize listings" : "Minimize listings"}
                            />
                        </div>

                        <div
                            ref={carouselRef}
                            onScroll={handleCarouselScroll}
                            className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 h-[320px] items-end"
                        >
                            {studiosList.map((studio) => (
                                <div key={studio.id} className="snap-center pb-4">
                                    <StudioCard
                                        studio={studio}
                                        variant="map-overlay"
                                        isHighlighted={hoveredStudioId === studio.id}
                                    />
                                </div>
                            ))}
                            <div className="w-20 flex-shrink-0" />
                        </div>
                    </div>

                    {/* Maximize Button Overlay (shown when minimized) */}
                    {isMinimized && (
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
                            <button
                                onClick={() => setIsMinimized(false)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-lighter font-bold text-xs text-white border border-white/10 shadow-2xl animate-bounce-subtle"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
                                Show Studios
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                /* List View UI */
                <div className="flex-1 bg-background pt-24 overflow-y-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto pb-20">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Studio Results</h2>
                                <p className="text-text-muted text-sm">{studiosList.length} recording spaces found</p>
                            </div>
                            <button
                                onClick={() => setMobileView('map')}
                                className="p-3 rounded-2xl bg-accent text-white shadow-glow flex items-center gap-2 font-bold text-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                Map View
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {isLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <div key={i} className="aspect-square rounded-[2rem] bg-surface-lighter/30 animate-pulse" />
                                ))
                            ) : (
                                studiosList.map((studio) => (
                                    <StudioCard key={studio.id} studio={studio} variant="grid-item" />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
