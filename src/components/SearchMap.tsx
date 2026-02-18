"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Studio } from "@/types";

// Demo token — replace with your own for production
mapboxgl.accessToken = "pk.eyJ1IjoiZGVtby1hY2NvdW50IiwiYSI6ImNsdmVyeWRlbW8ifQ.demo";

interface SearchMapProps {
    studios: Studio[];
    hoveredStudioId: string | null;
    onMarkerHover: (id: string | null) => void;
    onMarkerClick: (id: string) => void;
}

export default function SearchMap({
    studios,
    hoveredStudioId,
    onMarkerHover,
    onMarkerClick,
}: SearchMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<Map<string, { marker: mapboxgl.Marker; el: HTMLDivElement }>>(new Map());
    const [mapError, setMapError] = useState(false);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        try {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v11",
                center: [-118.2437, 34.0522], // Default to LA for this design
                zoom: 12,
                attributionControl: false,
                pitch: 45, // Slight tilt for premium feel
            });

            map.current.on("error", () => {
                setMapError(true);
            });
        } catch {
            setMapError(true);
        }

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, []);

    // Update markers when studios change
    useEffect(() => {
        if (!map.current) return;

        // Clear existing markers
        markersRef.current.forEach(({ marker }) => marker.remove());
        markersRef.current.clear();

        studios.forEach((studio) => {
            const el = document.createElement("div");
            el.className = "studio-marker-premium";
            el.innerHTML = `
              <div class="marker-content">
                <span class="price">$${studio.pricePerHour}/hr</span>
              </div>
              <div class="marker-dot"></div>
            `;

            // Marker CSS will be handled via globals.css but adding base styles here for robustness
            const isActive = studio.id === hoveredStudioId;
            el.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                z-index: ${isActive ? '20' : '10'};
            `;

            // Inner styling (to be moved to globals for better control if needed)
            const contentEl = el.querySelector('.marker-content') as HTMLElement;
            contentEl.style.cssText = `
                background: ${isActive ? '#7c3aed' : '#181826'};
                color: white;
                padding: 6px 12px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 800;
                font-family: 'Be Vietnam Pro', sans-serif;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5), ${isActive ? '0 0 15px rgba(124, 58, 237, 0.4)' : 'none'};
                border: 1px solid ${isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'};
                white-space: nowrap;
            `;

            const dotEl = el.querySelector('.marker-dot') as HTMLElement;
            dotEl.style.cssText = `
                width: 10px;
                height: 10px;
                background: ${isActive ? '#7c3aed' : '#7c3aed80'};
                border: 2px solid white;
                border-radius: 50%;
                margin-top: -2px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            `;

            el.addEventListener("mouseenter", () => {
                onMarkerHover(studio.id);
                el.style.transform = "scale(1.2) translateY(-4px)";
                contentEl.style.background = "#7c3aed";
                contentEl.style.boxShadow = "0 8px 20px rgba(124, 58, 237, 0.5)";
            });

            el.addEventListener("mouseleave", () => {
                onMarkerHover(null);
                if (studio.id !== hoveredStudioId) {
                    el.style.transform = "scale(1) translateY(0)";
                    contentEl.style.background = "#181826";
                    contentEl.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
                }
            });

            el.addEventListener("click", () => {
                onMarkerClick(studio.id);
                if (map.current) {
                    map.current.flyTo({
                        center: [studio.location.lng, studio.location.lat],
                        zoom: 14,
                        duration: 1000,
                    });
                }
            });

            const marker = new mapboxgl.Marker({ element: el })
                .setLngLat([studio.location.lng, studio.location.lat])
                .addTo(map.current!);

            markersRef.current.set(studio.id, { marker, el });
        });

        // Fit bounds if studios exist
        if (studios.length > 0 && map.current) {
            const bounds = new mapboxgl.LngLatBounds();
            studios.forEach((s) => bounds.extend([s.location.lng, s.location.lat]));
            map.current.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 800 });
        }
    }, [studios, onMarkerHover, onMarkerClick, hoveredStudioId]);

    // Right side map controls (UI Overlay)
    return (
        <div className="relative w-full h-full">
            <div ref={mapContainer} className="w-full h-full" />

            {/* Design Specific Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
                <button className="w-12 h-12 rounded-full bg-[#0f0f18]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors shadow-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
                <button className="w-12 h-12 rounded-full bg-[#0f0f18]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors shadow-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </button>
            </div>

            {mapError && (
                <div className="absolute inset-0 bg-[#050508]/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 z-20">
                    <p className="font-bold text-white mb-2">Map Interface Limited</p>
                    <p className="text-text-muted text-sm text-center">Add a valid Mapbox token to enable full interactive features.</p>
                </div>
            )}
        </div>
    );
}
