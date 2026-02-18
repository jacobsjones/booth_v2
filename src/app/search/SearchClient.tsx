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
    const carouselRef = useRef<HTMLDivElement>(null);

    const query = searchParams.get("q") || "";

    const { data } = useQuery({
        queryKey: ["studios-search", query],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (query) params.set("q", query);
            const res = await fetch(`/api/studios?${params}`);
            return res.json() as Promise<{ studios: Studio[]; total: number }>;
        },
    });

    const studiosList = useMemo(() => data?.studios || [], [data]);

    // Sync scroll with map center (Simplified for logic)
    const handleCarouselScroll = () => {
        if (!carouselRef.current) return;
        const scrollLeft = carouselRef.current.scrollLeft;
        const cardWidth = 310; // Card width (300) + gap (10 approx)
        const index = Math.round(scrollLeft / cardWidth);
        if (studiosList[index] && studiosList[index].id !== hoveredStudioId) {
            setHoveredStudioId(studiosList[index].id);
        }
    };

    const scrollToStudio = useCallback((studioId: string) => {
        setHoveredStudioId(studioId);
        const index = studiosList.findIndex(s => s.id === studioId);
        if (index !== -1 && carouselRef.current) {
            carouselRef.current.scrollTo({
                left: index * 310,
                behavior: 'smooth'
            });
        }
    }, [studiosList]);

    return (
        <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col overflow-hidden bg-background">
            {/* Redesigned Search Header Overlay */}
            <div className="absolute top-4 left-4 right-4 z-40">
                <div className="max-w-xl mx-auto flex items-center gap-3">
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

                        <button className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-glow">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex relative overflow-hidden mt-[80px]">
                {/* Map View (Always full on mobile) */}
                <div className="flex-1 relative h-full">
                    <SearchMap
                        studios={studiosList}
                        hoveredStudioId={hoveredStudioId}
                        onMarkerHover={setHoveredStudioId}
                        onMarkerClick={scrollToStudio}
                    />

                    {/* Floating List View Toggle (Desktop & Mobile) */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                        <button
                            onClick={() => setMobileView(mobileView === 'list' ? 'map' : 'list')}
                            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent text-white font-bold text-sm shadow-accent-glow transform active:scale-95 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            {mobileView === 'map' ? 'List View' : 'Map View'}
                        </button>
                    </div>

                    {/* Bottom Carousel Overlay */}
                    <div className="absolute bottom-10 left-0 right-0 z-20">
                        <div
                            ref={carouselRef}
                            onScroll={handleCarouselScroll}
                            className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 h-[420px] items-end"
                        >
                            {/* Spacer for centering */}
                            {studiosList.map((studio) => (
                                <div key={studio.id} className="snap-center pb-4">
                                    <StudioCard
                                        studio={studio}
                                        variant="map-overlay"
                                        isHighlighted={hoveredStudioId === studio.id}
                                    />
                                </div>
                            ))}
                            {/* Right spacer */}
                            <div className="w-20 flex-shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
