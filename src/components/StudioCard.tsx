"use client";

import Image from "next/image";
import Link from "next/link";
import { Studio } from "@/types";

interface StudioCardProps {
    studio: Studio;
    variant?: "default" | "compact" | "horizontal" | "featured-main" | "grid-item";
    onHover?: (id: string | null) => void;
    isHighlighted?: boolean;
}

export function StudioCard({
    studio,
    variant = "default",
    onHover,
    isHighlighted = false,
}: StudioCardProps) {
    // New Variant: Large Featured Card with Text Overlay
    if (variant === "featured-main") {
        return (
            <Link
                href={`/studios/${studio.id}`}
                className="group relative block w-[280px] sm:w-[320px] h-[380px] rounded-3xl overflow-hidden flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
                <Image
                    src={studio.images[0]}
                    alt={studio.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{studio.name}</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-white/80 text-xs font-medium">
                                {studio.rating} ({studio.reviewCount} reviews)
                            </span>
                        </div>
                        <span className="text-accent font-bold text-lg">
                            ${studio.pricePerHour}/hr
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    // New Variant: Vertical Grid Item with "BOOK NOW" Button
    if (variant === "grid-item") {
        return (
            <div className="group bg-surface rounded-[2rem] overflow-hidden border border-white/5 transition-all hover:border-accent/20 hover:shadow-accent-glow p-2">
                <Link href={`/studios/${studio.id}`} className="block">
                    <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-4">
                        <Image
                            src={studio.images[0]}
                            alt={studio.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 300px"
                        />
                        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="px-3 pb-2">
                        <h3 className="font-bold text-white text-lg truncate mb-1">
                            {studio.name}
                        </h3>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-text-muted text-xs">1.2 mi away</p>
                            <p className="text-accent font-bold text-sm">
                                ${studio.pricePerHour}/hr
                            </p>
                        </div>
                        <div className="w-full py-3.5 rounded-2xl bg-accent text-white font-bold text-sm tracking-widest hover:bg-accent-light transition-all active:scale-[0.98] text-center">
                            BOOK NOW
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

    if (variant === "horizontal") {
        return (
            <Link
                href={`/studios/${studio.id}`}
                className={`group flex gap-4 p-3 rounded-xl transition-all duration-300 ${isHighlighted ? "bg-accent/10 ring-1 ring-accent/30" : "hover:bg-card-hover"
                    }`}
                onMouseEnter={() => onHover?.(studio.id)}
                onMouseLeave={() => onHover?.(null)}
            >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        src={studio.images[0]}
                        alt={studio.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="112px"
                    />
                </div>
                <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-semibold text-sm truncate group-hover:text-accent transition-colors">
                        {studio.name}
                    </h3>
                    <p className="text-muted text-xs mt-1">
                        {studio.location.area} • {studio.location.city}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs font-medium">{studio.rating}</span>
                        <span className="text-muted text-xs">({studio.reviewCount})</span>
                    </div>
                    <p className="text-accent font-semibold text-sm mt-2">
                        ${studio.pricePerHour}
                        <span className="text-muted font-normal text-xs">/hr</span>
                    </p>
                </div>
            </Link>
        );
    }

    // Default / Compact
    return (
        <Link
            href={`/studios/${studio.id}`}
            className="group block rounded-2xl overflow-hidden bg-surface transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            onMouseEnter={() => onHover?.(studio.id)}
            onMouseLeave={() => onHover?.(null)}
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={studio.images[0]}
                    alt={studio.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-semibold">${studio.pricePerHour}/hr</span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-base group-hover:text-accent transition-colors">
                    {studio.name}
                </h3>
                <p className="text-muted text-sm mt-1">
                    {studio.location.area}, {studio.location.city}
                </p>
            </div>
        </Link>
    );
}
