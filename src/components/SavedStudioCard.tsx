import Image from "next/image";
import { Studio } from "@/types";

interface SavedStudioCardProps {
    studio: Studio;
}

export function SavedStudioCard({ studio }: SavedStudioCardProps) {
    // Determine the price range based on the base price to match the screenshot
    let priceRange = "";
    if (studio.name === "Neon Sound Labs") priceRange = "$85 - $130/hr";
    else if (studio.name === "The Echo Chamber") priceRange = "$60 - $100/hr";
    else if (studio.name === "Master Mix Hub") priceRange = "$120 - $250/hr";
    else if (studio.name === "Vocal Vibe Zone") priceRange = "$45 - $80/hr";
    else priceRange = `$${studio.pricePerHour}/hr`;

    return (
        <div className="flex flex-col">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-3">
                <Image
                    src={studio.images[0]}
                    alt={studio.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Heart Icon */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#A855F7]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md flex items-center gap-1.5">
                    <span className="text-yellow-400 text-[10px]">★</span>
                    <span className="text-white text-[10px] font-bold">{studio.rating}</span>
                </div>
            </div>

            <h3 className="text-white font-bold text-sm tracking-wide truncate mb-1">
                {studio.name}
            </h3>

            <div className="flex items-center gap-1 text-[#A1A1AA] text-xs mb-1.5">
                <svg className="w-3 h-3 text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{studio.location.area}</span>
            </div>

            <p className="text-[#A855F7] font-bold text-xs tracking-wide">
                {priceRange}
            </p>
        </div>
    );
}
