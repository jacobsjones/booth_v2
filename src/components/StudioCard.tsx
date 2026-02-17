"use client";

import Image from "next/image";
import Link from "next/link";
import { Studio } from "@/types";
import { useState } from "react";

interface StudioCardProps {
    studio: Studio;
    variant?: "default" | "compact" | "horizontal";
    onHover?: (id: string | null) => void;
    isHighlighted?: boolean;
}

export function StudioCard({
    studio,
    variant = "default",
    onHover,
    isHighlighted = false,
}: StudioCardProps) {
    const [imgLoaded, setImgLoaded] = useState(false);

    if (variant === "horizontal") {
        return (
            <Link
                href={`/studios/${studio.id}`}
                className={`group flex gap-4 p-3 rounded-xl transition-all duration-300 ${isHighlighted
                        ? "bg-accent/10 ring-1 ring-accent/30"
                        : "hover:bg-card-hover"
                    }`}
                onMouseEnter={() => onHover?.(studio.id)}
                onMouseLeave={() => onHover?.(null)}
            >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <div
                        className={`absolute inset-0 bg-surface-50 animate-pulse ${imgLoaded ? "hidden" : ""
                            }`}
                    />
                    <Image
                        src={studio.images[0]}
                        alt={studio.name}
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        sizes="112px"
                        onLoad={() => setImgLoaded(true)}
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
                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-xs font-medium">{studio.rating}</span>
                        <span className="text-muted text-xs">({studio.reviewCount})</span>
                    </div>
                    <p className="text-accent font-semibold text-sm mt-2">
                        £{studio.pricePerHour}
                        <span className="text-muted font-normal text-xs">/hr</span>
                    </p>
                </div>
            </Link>
        );
    }

    if (variant === "compact") {
        return (
            <Link
                href={`/studios/${studio.id}`}
                className="group block"
                onMouseEnter={() => onHover?.(studio.id)}
                onMouseLeave={() => onHover?.(null)}
            >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                    <div
                        className={`absolute inset-0 bg-surface-50 animate-pulse ${imgLoaded ? "hidden" : ""
                            }`}
                    />
                    <Image
                        src={studio.images[0]}
                        alt={studio.name}
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        sizes="(max-width: 768px) 50vw, 200px"
                        onLoad={() => setImgLoaded(true)}
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
                        <span className="text-xs font-semibold">£{studio.pricePerHour}/hr</span>
                    </div>
                </div>
                <h4 className="font-semibold text-sm truncate group-hover:text-accent transition-colors">
                    {studio.name}
                </h4>
                <div className="flex items-center gap-1 mt-1">
                    <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-xs font-medium">{studio.rating}</span>
                </div>
            </Link>
        );
    }

    // Default variant
    return (
        <Link
            href={`/studios/${studio.id}`}
            className={`group block rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${isHighlighted ? "ring-2 ring-accent shadow-card-hover" : ""
                }`}
            onMouseEnter={() => onHover?.(studio.id)}
            onMouseLeave={() => onHover?.(null)}
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <div
                    className={`absolute inset-0 bg-surface-50 animate-pulse ${imgLoaded ? "hidden" : ""
                        }`}
                />
                <Image
                    src={studio.images[0]}
                    alt={studio.name}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    onLoad={() => setImgLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-semibold">
                        £{studio.pricePerHour}/hr
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-base group-hover:text-accent transition-colors">
                    {studio.name}
                </h3>
                <p className="text-muted text-sm mt-1">
                    {studio.location.area}, {studio.location.city}
                </p>
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-sm font-medium">{studio.rating}</span>
                        <span className="text-muted text-sm">
                            ({studio.reviewCount} reviews)
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
