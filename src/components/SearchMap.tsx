"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Studio } from "@/types";

// Demo token — replace with your own for production
mapboxgl.accessToken =
    "pk.eyJ1IjoiZGVtby1hY2NvdW50IiwiYSI6ImNsdmVyeWRlbW8ifQ.demo";

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
    const popupRef = useRef<mapboxgl.Popup | null>(null);
    const [mapError, setMapError] = useState(false);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        try {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v11",
                center: [-2.0, 53.0], // UK center
                zoom: 5.5,
                attributionControl: false,
            });

            map.current.addControl(
                new mapboxgl.NavigationControl({ showCompass: false }),
                "bottom-right"
            );

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
    }, [hoveredStudioId]);

    // Update markers when studios change
    useEffect(() => {
        if (!map.current) return;

        // Clear existing markers
        markersRef.current.forEach(({ marker }) => marker.remove());
        markersRef.current.clear();

        studios.forEach((studio) => {
            const el = document.createElement("div");
            el.className = "studio-marker";
            el.innerHTML = `<span>£${studio.pricePerHour}</span>`;
            el.style.cssText = `
        background: white;
        color: #1a1a2e;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        font-family: 'Be Vietnam Pro', sans-serif;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: fit-content;
      `;

            el.addEventListener("mouseenter", () => {
                onMarkerHover(studio.id);
                el.style.background = "#6a25f4";
                el.style.color = "white";
                el.style.transform = "scale(1.15)";
                el.style.zIndex = "10";
            });

            el.addEventListener("mouseleave", () => {
                onMarkerHover(null);
                if (studio.id !== hoveredStudioId) {
                    el.style.background = "white";
                    el.style.color = "#1a1a2e";
                    el.style.transform = "scale(1)";
                    el.style.zIndex = "1";
                }
            });

            el.addEventListener("click", () => {
                onMarkerClick(studio.id);
                if (map.current) {
                    map.current.flyTo({
                        center: [studio.location.lng, studio.location.lat],
                        zoom: 14,
                        duration: 1200,
                    });
                }

                // Show popup
                if (popupRef.current) {
                    popupRef.current.remove();
                }

                const popupContent = `
          <a href="/studios/${studio.id}" style="display:block;text-decoration:none;color:inherit;">
            <div style="width:240px;">
              <div style="width:100%;height:120px;overflow:hidden;border-radius:12px 12px 0 0;">
                <img src="${studio.images[0]}" alt="${studio.name}" style="width:100%;height:100%;object-fit:cover;" />
              </div>
              <div style="padding:12px;">
                <h3 style="margin:0;font-size:14px;font-weight:600;color:white;">${studio.name}</h3>
                <p style="margin:4px 0 0;font-size:12px;color:#8888a4;">${studio.location.area}, ${studio.location.city}</p>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;">
                  <div style="display:flex;align-items:center;gap:4px;">
                    <span style="color:#facc15;">★</span>
                    <span style="font-size:12px;font-weight:500;color:white;">${studio.rating}</span>
                    <span style="font-size:11px;color:#8888a4;">(${studio.reviewCount})</span>
                  </div>
                  <span style="font-size:13px;font-weight:600;color:#6a25f4;">£${studio.pricePerHour}/hr</span>
                </div>
              </div>
            </div>
          </a>
        `;

                popupRef.current = new mapboxgl.Popup({
                    offset: 15,
                    closeButton: true,
                    maxWidth: "260px",
                })
                    .setLngLat([studio.location.lng, studio.location.lat])
                    .setHTML(popupContent)
                    .addTo(map.current!);
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
            map.current.fitBounds(bounds, { padding: 60, maxZoom: 12, duration: 800 });
        }
    }, [studios, onMarkerHover, onMarkerClick]);

    // Highlight marker on hover from listings panel
    useEffect(() => {
        markersRef.current.forEach(({ el }, id) => {
            if (id === hoveredStudioId) {
                el.style.background = "#6a25f4";
                el.style.color = "white";
                el.style.transform = "scale(1.15)";
                el.style.zIndex = "10";
            } else {
                el.style.background = "white";
                el.style.color = "#1a1a2e";
                el.style.transform = "scale(1)";
                el.style.zIndex = "1";
            }
        });
    }, [hoveredStudioId]);

    if (mapError) {
        return (
            <div className="w-full h-full bg-surface-300 flex flex-col items-center justify-center gap-4 p-8">
                <div className="w-20 h-20 rounded-2xl bg-surface-50 flex items-center justify-center">
                    <svg className="w-10 h-10 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                        <line x1="8" y1="2" x2="8" y2="18" />
                        <line x1="16" y1="6" x2="16" y2="22" />
                    </svg>
                </div>
                <div className="text-center">
                    <p className="font-medium mb-1">Map Unavailable</p>
                    <p className="text-muted text-sm max-w-xs">
                        Add your Mapbox access token in <code className="text-accent text-xs">SearchMap.tsx</code> to enable the interactive map.
                    </p>
                </div>

                {/* Fallback: static grid of markers */}
                <div className="mt-6 grid grid-cols-2 gap-2 max-w-sm">
                    {studios.slice(0, 6).map((s) => (
                        <button
                            key={s.id}
                            onClick={() => onMarkerClick(s.id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card hover:bg-card-hover transition-colors text-left"
                        >
                            <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                            <div>
                                <p className="text-xs font-medium truncate">{s.name}</p>
                                <p className="text-[10px] text-muted">£{s.pricePerHour}/hr</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return <div ref={mapContainer} className="w-full h-full" />;
}
